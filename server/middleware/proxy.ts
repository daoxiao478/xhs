import { defineEventHandler, proxyRequest } from 'h3';

export default defineEventHandler(async event => {
  const url = event.path;
  console.log("🚀 ~ url:", url)
  if (url.startsWith('/api/proxy')) {
    return proxyRequest(event, `http://localhost:3001${url}`);
  }
});
