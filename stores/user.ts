import type {
  ApiSnsWebV1UserPostedGet200ResponseDataNotesInner,
  ApiSnsWebV1UserPostedGet200ResponseData
} from "xhs-api-sdk";

export const useUserStore = defineStore("user", () => {
  const loading = ref(true);
  const userInfo = ref<ApiSnsWebV1UserPostedGet200ResponseData>();
  const notes = ref<any[]>([]);
  const hasMore = ref(false);
  const currentCursor = ref("");

  async function fetchNotes(id: string, xsecToken: string, reset = true) {
    if (reset) {
      notes.value = [];
      currentCursor.value = "";
    }

    loading.value = true;
    const res = await $fetch<{
      data: ApiSnsWebV1UserPostedGet200ResponseData;
    }>(`/api/edith/sns/web/v1/user_posted`, {
      method: "GET",
      query: {
        num: 30,
        cursor: currentCursor.value,
        user_id: id,
        image_formats: "jpg,webp,avif",
        xsec_token: xsecToken,
        xsec_source: "pc_note"
      },
    });

    notes.value = res.data.notes.map((note) => {
      return {
        id: note.note_id,
        xsec_token: note.xsec_token,
        cover: note.cover.url_default,
        title: note.display_title,
        interact_info: note.interact_info,
        user: userInfo.value,
        is_video: note.type === "video",
      };
    });
    currentCursor.value = res.data.cursor;
    hasMore.value = res.data.has_more;
    loading.value = false;
  }

  return {
    userInfo,
    notes,
    loading,
    hasMore,
    fetchNotes,
  };
});
