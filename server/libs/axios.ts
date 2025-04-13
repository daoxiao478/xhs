import axios from "axios";
import { DefaultApi } from "xhs-api-sdk";

export const instance = axios.create({
  baseURL: "https://edith.xiaohongshv.com",
});

instance.interceptors.request.use((config) => {

  // @ts-ignore
  config.headers = {
    ...config.headers,
    referer: "https://www.xiaohongshu.com",
    origin: "https://www.xiaohongshu.com",
  };
  return config;
});

export const api = new DefaultApi(undefined, undefined, instance);