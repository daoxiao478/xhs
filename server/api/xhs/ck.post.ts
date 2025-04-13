import { Cookie } from "lucide-vue-next";
import { instance } from "~/server/libs/axios";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { ck } = body;

  if (!ck.includes("a1")) {
    return {
      success: false,
      message: "登录失败",
    };
  }

  const res = await instance.get("/api/sns/web/v2/user/me", {
    headers: {
      cookie: `${ck}`,
      referer: "https://www.xiaohongshu.com",
      origin: "https://www.xiaohongshu.com",
    },
  });

  const cookies = ck.split(";").map((item: string) => {
    const [key, value] = item.split("=");
    return {
      key,
      value,
    };
  });

  cookies.forEach((item: any) => {
    setCookie(event, item.key, item.value);
  });

  if (res.data?.success) {
    return {
      success: true,
      user: res.data.data,
      message: "登录成功"
    };
  }

  return {
    success: false,
    message: "登录失败",
  };
});
