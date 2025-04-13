import { instance } from "~/server/libs/axios";

export default defineEventHandler(async (event) => {
  const cookie = getHeader(event, "cookie");
  if (!cookie) {
    return {
      success: false,
      message: "请先登录",
    };
  }

  const { keyword } = getQuery(event);

  return {
    success: true,
    message: "获取笔记成功",
    data: {
      keyword,
    },
  };
});
