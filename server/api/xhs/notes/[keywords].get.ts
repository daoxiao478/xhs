import { api, instance } from "~/server/libs/axios";

export default defineEventHandler(async (event) => {
  const cookie = getHeader(event, "cookie");
  if (!cookie) {
    return {
      success: false,
      message: "请先登录",
    };
  }

  const keywords = getRouterParam(event, "keywords");
  const res = await api.apiSnsWebV1HomefeedPost({
    apiSnsWebV1HomefeedPostRequest: {
      cursor_score: "",
      num: 27,
      refresh_type: 1,
      note_index: 0,
      unread_begin_note_id: "",
      unread_end_note_id: "",
      unread_note_count: 0,
      category: "homefeed_recommend",
      search_key: "",
      need_num: 12,
      image_formats: ["jpg", "webp", "avif"],
      need_filter_image: false,
    },
  });

  return {
    success: true,
    message: "获取笔记成功",
    data: {
      keywords: decodeURIComponent(keywords!),
      notes: res.data.data.items,
    },
  };
});
