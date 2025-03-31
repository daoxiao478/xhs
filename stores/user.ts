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

    const res = await $fetch<ApiSnsWebV1UserPostedGet200ResponseData>(`/api/proxy/users/${id}`, {
      method: "GET",
      query: {
        xsecToken,
        cursor: currentCursor.value,
      },
    });

    notes.value = res.notes.map((note) => {
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
    currentCursor.value = res.cursor;
    hasMore.value = res.has_more;
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
