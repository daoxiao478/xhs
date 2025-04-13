import type {
  ApiSnsWebV2CommentPageGet200ResponseData,
  ApiSnsWebV1FeedPost200ResponseData,
  ApiSnsWebV1FeedPost200ResponseDataItemsInner,
} from "xhs-api-sdk";

export const useCommentsStore = defineStore("comments", () => {
  const loading = ref(true);
  const postInfo = ref<ApiSnsWebV1FeedPost200ResponseDataItemsInner>();
  const comments = ref<ApiSnsWebV2CommentPageGet200ResponseData["comments"]>(
    []
  );
  const hasMore = ref(false);
  const currentCursor = ref("");

  const computedPostInfo = computed(() => {
    return {
      id: postInfo.value?.id,
      cover: postInfo.value?.note_card?.image_list[0].url_default,
      title: postInfo.value?.note_card?.title,
      user: postInfo.value?.note_card?.user,
      publish_time: postInfo.value?.note_card?.time,
      interact_info: postInfo.value?.note_card?.interact_info,
      desc: postInfo.value?.note_card?.desc,
    };
  });

  async function fetchPostInfo(id: string, xsecToken: string) {
    loading.value = true;
    try {
      const res = await $fetch<{ data: ApiSnsWebV1FeedPost200ResponseData }>(
        `/api/edith/sns/web/v1/feed`,
        {
          method: "POST",
          body: {
            source_note_id: id,
            image_formats: ["jpg", "webp", "avif"],
            extra: { need_body_topic: "1" },
            xsec_source: "pc_feed",
            xsec_token: xsecToken,
          },
        }
      );
      postInfo.value = res.data.items?.[0];
    } finally {
      loading.value = false;
    }
  }

  async function fetchComments(id: string, xsecToken: string, reset = false) {
    if (reset) {
      comments.value = [];
      currentCursor.value = "";
    }

    const res = await $fetch<{
      data: {
        comments: ApiSnsWebV2CommentPageGet200ResponseData["comments"];
        cursor: string;
        has_more: boolean;
      };
    }>(`/api/edith/sns/web/v2/comment/page`, {
      method: "GET",
      query: {
        note_id: id,
        cursor: currentCursor.value,
        top_comment_id: "",
        image_formats: ["jpg", "webp", "avif"],
        xsec_token: xsecToken,
      }
    });

    comments.value = [...comments.value, ...res.data.comments];
    currentCursor.value = res.data.cursor;
    hasMore.value = res.data.has_more;
  }

  return {
    postInfo,
    comments,
    computedPostInfo,
    loading,
    hasMore,
    fetchPostInfo,
    fetchComments,
  };
});
