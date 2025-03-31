import type {
  ApiSnsWebV2CommentPageGet200ResponseData,
  ApiSnsWebV1FeedPost200ResponseData,
  ApiSnsWebV1FeedPost200ResponseDataItemsInner,
} from "xhs-api-sdk";

export const useCommentsStore = defineStore("comments", () => {
  const loading = ref(true);
  const postInfo = ref<ApiSnsWebV1FeedPost200ResponseDataItemsInner>();
  const comments = ref<ApiSnsWebV2CommentPageGet200ResponseData['comments']>([]);
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
      const res = await $fetch<ApiSnsWebV1FeedPost200ResponseData>(
        `/api/proxy/post/${id}`,
        {
          method: "GET",
          query: {
            xsecToken,
          },
        }
      );
      postInfo.value = res.items?.[0];
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
      comments: ApiSnsWebV2CommentPageGet200ResponseData['comments'];
      cursor: string;
      has_more: boolean;
    }>(
      `/api/proxy/post/${id}/comments`,
      {
        method: "GET",
        query: {
          xsecToken,
          cursor: currentCursor.value,
        },
      }
    );

    comments.value = [...comments.value, ...res.comments];
    currentCursor.value = res.cursor;
    hasMore.value = res.has_more;
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
