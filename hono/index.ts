import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pptr from "./playwright";
import { get_search_id } from "./sign";
import { stream } from "hono/streaming";
import qrcode from "qrcode";
import { logger } from "hono/logger";
import axios from "axios";

const app = new Hono().basePath("/api/proxy");

app.use(logger());

app.get("/", (c) => c.text("Hello World"));

app.get("/profile", async (c) => {
  const res = await pptr.profile();
  return c.json(res);
});

app.get("/code_base64", async (c) => {
  const qr = await pptr.qrcode();
  const url = qr.data.url;
  const qrCode = await qrcode.toDataURL(url);
  return c.text(qrCode);
});

app.get("/code", async (c) => {
  const qr = await pptr.qrcode();
  const url = qr.data.url;
  const qrCode = await qrcode.toDataURL(url);
  c.res.headers.set("Content-Type", "image/png");
  return stream(c, async (stream) => {
    const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    stream.write(buffer);
  });
});

app.post("/cookie_login", async (c) => {
  const q = await c.req.json();
  const web_session = q.web_session;

  if (!web_session) {
    return c.json({
      code: 400,
      message: "web_session is required",
    });
  }

  const resp = await axios.get("https://edith.xiaohongshu.com/api/sns/web/v2/user/me", {
    headers: {
      cookie: web_session,
    },
  });

  const data = resp.data;
  if (data.code !== 0) {
    return c.json({
      code: 400,
      message: "cookie is invalid",
    });
  }

  const res = await pptr.cookieLogin(web_session);
  return c.json(res);
});



app.get("/is_login", async (c) => {
  await pptr.checkQrcode();
  const isLogin = await pptr.isLogin();
  return c.json({
    isLogin,
  });
});

app.get("/usersearch", async (c) => {
  const keyword = c.req.query("keyword");
  const api = pptr.ins();
  const res = await api.apiSnsWebV1SearchUsersearchPost({
    apiSnsWebV1SearchUsersearchPostRequest: {
      search_user_request: {
        keyword: keyword!,
        page: 1,
        page_size: 20,
        search_id: get_search_id(),
        biz_type: "user",
        request_id: `${Math.round(Date.now() / 1000)}-${Date.now()}`,
      },
    },
  });

  return c.json(res.data.data);
});

app.get("/notes/:keyword", async (c) => {
  const keyword = c.req.param("keyword");
  const api = pptr.ins();

  if (keyword === "推荐") {
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

    return c.json(res.data.data);
  }

  const res = await api.apiSnsWebV1SearchNotesPost({
    apiSnsWebV1SearchNotesPostRequest: {
      keyword,
      page: 1,
      page_size: 20,
      search_id: get_search_id(),
      sort: "general",
      note_type: 0,
      ext_flags: [],
      image_formats: ["jpg", "webp", "avif"],
      geo: "",
      filters: [],
    },
  });

  return c.json(res.data.data);
});

// 获取帖子基本信息
app.get("/post/:id", async (c) => {
  const id = c.req.param("id");
  const xsecToken = c.req.query("xsecToken");

  const api = pptr.ins();
  const res = await api.apiSnsWebV1FeedPost({
    apiSnsWebV1FeedPostRequest: {
      source_note_id: id,
      image_formats: ["jpg", "webp", "avif"],
      extra: {
        need_body_topic: "1",
      },
      xsec_source: "pc_feed",
      xsec_token: xsecToken!,
    },
  });

  const post = res.data.data;
  return c.json(post);
});

app.get("/users/:id", async (c) => {
  const id = c.req.param("id");
  const xsecToken = c.req.query("xsecToken");

  const api = pptr.ins();
  const res = await api.apiSnsWebV1UserPostedGet({
    userId: id,
    xsecToken,
    num: "30",
    cursor: "",
    imageFormats: "jpg,webp,avif",
    xsecSource: "pc_note",
  });

  return c.json(res?.data.data);
});

app.post("/batch_download", async (c) => {
  const q = await c.req.json();
  if (!q.list) {
    return c.json({
      code: 400,
      message: "list is required",
    });
  }
  const api = pptr.ins();

  const reps = await Promise.all(
    q.list.map(async (item: any) => {
      return api.apiSnsWebV1FeedPost({
        apiSnsWebV1FeedPostRequest: {
          source_note_id: item.id,
          image_formats: ["jpg", "webp", "avif"],
          extra: {
            need_body_topic: "1",
          },
          xsec_source: "pc_feed",
          xsec_token: item.xsec_token,
        },
      });
    })
  );
  const res = reps.map((item) => item.data.data.items?.[0]);
  return c.json(res);
});

app.post("/batch_download_note_comments", async (c) => {
  const q = await c.req.json();
  const id = q.id;
  const xsecToken = q.xsecToken;

  const api = pptr.ins();
  let max = 20;
  let cursor = "";
  const comments: any[] = [];
  while (max > 0) {
    max--;
    const res = await api.apiSnsWebV2CommentPageGet({
      noteId: id,
      cursor,
      imageFormats: "jpg,webp,avif",
      xsecToken,
    });

    cursor = res.data.data.cursor;
    comments.push(...res.data.data.comments);
  }

  return c.json(comments);
});

// 获取评论列表
app.get("/post/:id/comments", async (c) => {
  const id = c.req.param("id");
  const xsecToken = c.req.query("xsecToken");
  const cursor = c.req.query("cursor") || "";

  const api = pptr.ins();
  const res = await api.apiSnsWebV2CommentPageGet({
    noteId: id,
    cursor,
    imageFormats: "jpg,webp,avif",
    xsecToken,
  });

  const comments = res.data.data.comments;
  // 按点赞数排序
  comments.sort((a, b) => +b.like_count - +a.like_count);

  return c.json({
    comments,
    cursor: comments.length > 0 ? comments[comments.length - 1].id : "",
    has_more: res.data.data.has_more,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
