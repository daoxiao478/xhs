import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { Ref } from "vue";
import type { Post, SearchOptions } from "@/types/posts";
import { useSettingsStore } from "./settings";

// https://www.xiaohongshu.com/user/profile/5db4ee050000000001001eb8?xsec_token=ABjodTErC3_WaCF19iZPOrtWlHl3AAp5l8BPMCakZt1EA=&xsec_source=pc_note
function ifProfileUrl(url: string) {
  url = url.trim();

  // 检查是否是小红书个人主页链接
  if (!url.startsWith("https://www.xiaohongshu.com/user/profile/")) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const userId = urlObj.pathname.split("/").pop();
    const xsecToken = urlObj.searchParams.get("xsec_token");

    if (!userId || !xsecToken) {
      return false;
    }

    if (userId.length !== 24) {
      return false;
    }

    return {
      userId,
      xsecToken,
    };
  } catch (e) {
    return false;
  }
}

export const usePostsStore = defineStore("posts", () => {
  const settingsStore = useSettingsStore();
  const searchQuery: Ref<string> = ref("");
  // @ts-ignore
  const posts: Ref<Post[]> = ref({
    items: [],
    has_more: true,
  });
  const isSearching: Ref<boolean> = ref(false);
  const isLoadingMore: Ref<boolean> = ref(false);
  const hasSearched: Ref<boolean> = ref(false);
  const hasMorePosts: Ref<boolean> = ref(false);

  const searchOptions: SearchOptions = reactive({
    sort: "general",
    type: "notes",
    limit: 20,
    page: 1,
    collectDetail: false,
  });

  // 搜索帖子
  const searchPosts = async (): Promise<void> => {
    isSearching.value = true;
    hasSearched.value = true;
    searchOptions.page = 1;

    const profileUrl = ifProfileUrl(searchQuery.value);
    if (profileUrl) {
      navigateTo(
        `/users/${profileUrl.userId}?xsec_token=${profileUrl.xsecToken}`
      );
      return;
    }

    try {
      const result = await $fetch<{
        items: any[];
        has_more: boolean;
      }>(`${settingsStore.proxyUrl}/api/proxy/notes/${searchQuery.value}`, {
        method: "GET",
      });

      posts.value = result.items
        .filter((item) => item.model_type === "note")
        .map((item) => ({
          id: item.id,
          xsec_token: item.xsec_token,
          cover: item.note_card?.cover?.url_default,
          title: item.note_card?.display_title,
          publish_time: item.note_card?.corner_tag_info?.[0]?.text,
          user: {
            user_id: item.note_card?.user.user_id,
            nickname: item.note_card?.user.nickname,
            avatar: item.note_card?.user.avatar,
            xsec_token: item.note_card?.user.xsec_token,
          },
          interact_info: {
            liked_count: item.note_card?.interact_info?.liked_count || 0,
            collected_count:
              item.note_card?.interact_info?.collected_count || 0,
            comment_count: item.note_card?.interact_info?.comment_count || 0,
          },
          imageList:
            item.note_card?.image_list?.map((img: any) => img.info_list[0].url) ||
            [],
          is_video: item.note_card?.type === "video",
        }))
        .sort(
          (a, b) => b.interact_info.liked_count - a.interact_info.liked_count
        );

      hasMorePosts.value = result.has_more || false;
    } catch (error) {
      console.error("搜索帖子失败:", error);
    } finally {
      isSearching.value = false;
    }
  };

  onMounted(async () => {
    searchQuery.value = "推荐";
    await searchPosts();
  });

  // 加载更多帖子
  const loadMorePosts = async (): Promise<void> => {
    // TODO: 实现加载更多逻辑
  };

  // 更新搜索关键词
  const updateSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  // 更新搜索选项
  const updateSearchOptions = (options: Partial<SearchOptions>): void => {
    Object.assign(searchOptions, options);
  };

  const getPostById = (id: string): Post | undefined => {
    return posts.value.find((post) => post.id === id);
  };

  return {
    // 状态
    searchQuery,
    posts,
    isSearching,
    isLoadingMore,
    hasSearched,
    hasMorePosts,
    searchOptions,

    // 操作方法
    searchPosts,
    loadMorePosts,
    updateSearchQuery,
    updateSearchOptions,
    getPostById,
  };
});
