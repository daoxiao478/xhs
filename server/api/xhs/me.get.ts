import { instance } from "~/server/libs/axios";

export default defineEventHandler(async (event) => {
  const cookie = getHeader(event, "cookie");
  if (!cookie) {
    return {
      success: false,
      message: "请先登录",
    };
  }
  console.log(cookie);
  const res = await instance.get("/api/sns/web/v2/user/me", {
    headers: {
      cookie,
      referer: "https://www.xiaohongshu.com",
      origin: "https://www.xiaohongshu.com",
    },
  });

  if (!res.data?.success) {
    return {
      success: false,
      message: "登录失败",
    };
  }

  return {
    success: true,
    message: "获取用户信息成功",
    data: res.data.data,
  };
});
