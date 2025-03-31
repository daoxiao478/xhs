import JSZip from "jszip";
import type {
  ApiSnsWebV1FeedPost200ResponseDataItemsInner,
  ApiSnsWebV2CommentPageGet200ResponseDataCommentsInner,
} from "xhs-api-sdk";
import { saveAs } from "file-saver";
import _ from "lodash";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/stores/settings";

// 下载图片
export const downloadImage = async (
  url: string
): Promise<ArrayBuffer | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.arrayBuffer();
  } catch (error) {
    console.error("下载图片失败:", url, error);
    return null;
  }
};

// 扩展Post类型
export interface ExtendedPost {
  id: string;
  title: string;
  publish_time?: string;
  description?: string;
  cover: string;
  imageList: string[];
  user: {
    user_id: string;
    nickname: string;
    avatar?: string;
    xsec_token?: string;
  };
  interact_info: {
    liked_count: number;
    collected_count: number;
    comment_count: number;
  };
  is_video: boolean;
  xsec_token?: string;
  video_url?: string;
}

export const downloadAssetWithProxy = async <T extends Blob | string>(
  url: string,
  timeout = 30
) => {
  const settingsStore = useSettingsStore();
  const proxyUrl = settingsStore.getCurrentAndRotateProxy();
  let targetURL = `${proxyUrl}?url=${encodeURIComponent(
    url
  )}&headers=${encodeURIComponent(JSON.stringify({}))}`;
  targetURL = targetURL.replace(/^http:\/\//, "https://");

  return await $fetch<T>(targetURL, {
    retry: 0,
    timeout: timeout * 1000,
  });
};

// 导出所有帖子为zip文件
export const exportPosts = async (
  reqParams: {
    id: string;
    xsec_token: string;
  }[]
) => {
  if (reqParams.length === 0) {
    alert("没有帖子可导出");
    return;
  }

  const list = await $fetch<ApiSnsWebV1FeedPost200ResponseDataItemsInner[]>(
    "/api/proxy/batch_download",
    {
      method: "POST",
      body: {
        list: reqParams,
      },
    }
  );

  try {
    const zip = new JSZip();
    const postsFolder = zip.folder("posts");

    if (!postsFolder) {
      throw new Error("创建posts文件夹失败");
    }

    // 创建一个包含所有帖子信息的JSON文件
    const postsData = list.map((post) => ({
      id: post.id,
      title: post.note_card.title,
      publish_time: post.note_card.time,
      description: "", // 默认空字符串
      cover: post.note_card.image_list[0].url_default,
      imageList: post.note_card.image_list.map((item) => item.url_default),
      user: {
        user_id: post.note_card.user.user_id,
        nickname: post.note_card.user.nickname,
      },
      interact_info: {
        liked_count: post.note_card.interact_info.liked_count,
        collected_count: post.note_card.interact_info.collected_count,
        comment_count: post.note_card.interact_info.comment_count,
      },
      video_url: _.get(
        post,
        "note_card.video.media.stream.h265[0].backup_urls[0]",
        ""
      ),
    }));

    postsFolder.file("posts_data.json", JSON.stringify(postsData, null, 2));

    // 为每个帖子创建一个文件夹
    const downloadPromises = [];

    for (let i = 0; i < postsData.length; i++) {
      const post = postsData[i];
      const postFolder = postsFolder.folder(post.title || post.id);

      if (!postFolder) {
        console.error(`创建post_${post.id}文件夹失败`);
        continue;
      }

      // 添加帖子信息
      const postInfo = {
        id: post.id,
        title: post.title,
        publish_time: post.publish_time,
        description: post.description, // 默认空字符串
        user: {
          user_id: post.user.user_id,
          nickname: post.user.nickname,
        },
        interact_info: post.interact_info,
        video_url: post.video_url!,
      };

      postFolder.file("info.json", JSON.stringify(postInfo, null, 2));

      // 添加图片下载任务
      if (post.cover) {
        downloadPromises.push(
          downloadImage(post.cover).then((data) => {
            if (data && postFolder) {
              postFolder.file("cover.jpg", data, { binary: true });
            }
          })
        );
      }

      if (post.video_url) {
        downloadPromises.push(
          downloadAssetWithProxy(post.video_url).then((data) => {
            if (data && postFolder) {
              postFolder.file("video.mp4", data, { binary: true });
            }
          })
        );
      }

      // 添加图片列表下载任务
      if (post.imageList && post.imageList.length > 0) {
        const imageFolder = postFolder.folder("images");

        if (!imageFolder) {
          console.error(`创建images文件夹失败，帖子ID: ${post.id}`);
          continue;
        }

        post.imageList.forEach((imageUrl, imageIndex) => {
          downloadPromises.push(
            downloadImage(imageUrl).then((data) => {
              if (data && imageFolder) {
                imageFolder.file(`image_${imageIndex + 1}.jpg`, data, {
                  binary: true,
                });
              }
            })
          );
        });
      }
    }

    // 等待所有图片下载完成
    await Promise.all(downloadPromises);

    // 生成zip文件并下载
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(
      zipBlob,
      `小红书帖子导出_${new Date().toISOString().split("T")[0]}.zip`
    );
  } catch (error) {
    console.error("导出失败:", error);
    alert("导出失败，请查看控制台获取详细信息");
  }
};

export function useDownloadComments() {
  const l = ref(false);
  const route = useRoute();

  async function dc() {
    let ps = [];
    l.value = true;
    const comments = await $fetch<
      ApiSnsWebV2CommentPageGet200ResponseDataCommentsInner[]
    >("/api/proxy/batch_download_note_comments", {
      method: "POST",
      body: {
        id: route.params.id,
        xsecToken: route.query.xsec_token,
      },
    });

    const zip = new JSZip();
    const commentsFolder = zip.folder("comments");

    if (!commentsFolder) {
      throw new Error("创建comments文件夹失败");
    }

    let images: string[] = [];
    let text = "";

    comments.forEach((comment) => {
      text += `${comment.user_info.nickname}: ${comment.content}\n`;
      if (comment.pictures && comment.pictures.length > 0) {
        comment.pictures.forEach((picture) => {
          images.push(picture.url_default);
        });
      }
    });

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      ps.push(
        downloadImage(image).then((data) => {
          if (data && commentsFolder) {
            commentsFolder.file(`image_${i + 1}.jpg`, data, { binary: true });
          }
        })
      );
    }

    await Promise.all(ps);
    commentsFolder.file("comments.txt", text);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(
      zipBlob,
      `小红书评论导出_${new Date().toISOString().split("T")[0]}.zip`
    );

    l.value = false;
  }

  return {
    l,
    dc,
  };
}
