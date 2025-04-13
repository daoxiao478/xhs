import { defineEventHandler, proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  let url = event.path;
  if (url.startsWith("/api/edith")) {
    const cookie = getHeader(event, "cookie");
    if (!cookie) {
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    url = url.replace("/api/edith", "/api");
    return proxyRequest(event, `https://edith.xiaohongshv.com${url}`);
  }
});
