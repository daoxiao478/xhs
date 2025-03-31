# 视频接口

本页面介绍 XHS1 提供的视频相关 API。

## 视频信息

### 获取视频信息

```http
GET /api/video/info
```

获取单个视频的详细信息。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | string | 是 | 视频链接或ID |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "12345678",
    "title": "视频标题",
    "author": {
      "id": "user123",
      "nickname": "用户昵称",
      "avatar": "头像URL"
    },
    "stats": {
      "likes": 1000,
      "comments": 100,
      "shares": 50
    },
    "video": {
      "duration": 60,
      "width": 1080,
      "height": 1920,
      "url": "视频URL"
    },
    "createTime": "2024-03-31T12:00:00Z",
    "updateTime": "2024-03-31T12:00:00Z"
  }
}
```

### 批量获取视频信息

```http
POST /api/video/info/batch
```

批量获取多个视频的信息。

#### 请求参数

```json
{
  "urls": [
    "视频链接1",
    "视频链接2"
  ]
}
```

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "12345678",
      "title": "视频1",
      "author": {
        "id": "user123",
        "nickname": "用户1"
      }
    },
    {
      "id": "87654321",
      "title": "视频2",
      "author": {
        "id": "user456",
        "nickname": "用户2"
      }
    }
  ]
}
```

## 视频下载

### 下载单个视频

```http
GET /api/video/download
```

下载单个视频文件。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | string | 是 | 视频链接或ID |
| quality | string | 否 | 视频质量(1080p/720p/480p) |
| format | string | 否 | 视频格式(mp4/webm) |

#### 响应

文件流，视频文件的二进制数据。

### 批量下载视频

```http
POST /api/video/download/batch
```

批量下载多个视频。

#### 请求参数

```json
{
  "videos": [
    {
      "url": "视频链接1",
      "quality": "1080p"
    },
    {
      "url": "视频链接2",
      "quality": "720p"
    }
  ],
  "options": {
    "concurrent": 3,
    "timeout": 30000
  }
}
```

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_12345",
    "total": 2,
    "status": "processing"
  }
}
```

### 获取下载进度

```http
GET /api/video/download/progress
```

获取批量下载任务的进度。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| taskId | string | 是 | 任务ID |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_12345",
    "total": 2,
    "finished": 1,
    "failed": 0,
    "progress": 50,
    "status": "processing",
    "details": [
      {
        "url": "视频链接1",
        "status": "completed",
        "progress": 100
      },
      {
        "url": "视频链接2",
        "status": "downloading",
        "progress": 30
      }
    ]
  }
}
```

## 视频搜索

### 搜索视频

```http
GET /api/video/search
```

搜索视频。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 是 | 搜索关键词 |
| page | number | 否 | 页码，默认1 |
| size | number | 否 | 每页数量，默认20 |
| sort | string | 否 | 排序方式(time/hot) |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 100,
    "items": [
      {
        "id": "12345678",
        "title": "视频标题1",
        "author": {
          "id": "user123",
          "nickname": "用户1"
        },
        "stats": {
          "likes": 1000,
          "comments": 100
        }
      }
    ]
  }
}
```

## 错误码

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 视频不存在 |
| 1003 | 下载失败 |
| 1004 | 任务不存在 |
| 1005 | 网络错误 |
| 1006 | 服务器错误 |

## 使用示例

### cURL

```bash
# 获取视频信息
curl -X GET "http://localhost:3000/api/video/info?url=https://www.xiaohongshu.com/video/12345678"

# 下载视频
curl -X GET "http://localhost:3000/api/video/download?url=https://www.xiaohongshu.com/video/12345678" --output video.mp4

# 批量下载
curl -X POST "http://localhost:3000/api/video/download/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "videos": [
      {"url": "https://www.xiaohongshu.com/video/12345678"},
      {"url": "https://www.xiaohongshu.com/video/87654321"}
    ]
  }'
```

### JavaScript

```javascript
// 获取视频信息
async function getVideoInfo(url) {
  const response = await fetch(`/api/video/info?url=${encodeURIComponent(url)}`);
  const data = await response.json();
  return data;
}

// 批量下载视频
async function batchDownload(videos) {
  const response = await fetch('/api/video/download/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videos })
  });
  const data = await response.json();
  return data;
}

// 获取下载进度
async function getProgress(taskId) {
  const response = await fetch(`/api/video/download/progress?taskId=${taskId}`);
  const data = await response.json();
  return data;
}
```

### Python

```python
import requests

# 获取视频信息
def get_video_info(url):
    response = requests.get(f"http://localhost:3000/api/video/info", params={"url": url})
    return response.json()

# 批量下载视频
def batch_download(videos):
    response = requests.post(
        "http://localhost:3000/api/video/download/batch",
        json={"videos": videos}
    )
    return response.json()

# 获取下载进度
def get_progress(task_id):
    response = requests.get(
        f"http://localhost:3000/api/video/download/progress",
        params={"taskId": task_id}
    )
    return response.json()
```

## 注意事项

1. 请求限制
   - API 调用频率限制：60次/分钟
   - 批量下载数量限制：50个/批
   - 并发下载限制：5个

2. 视频格式
   - 支持的质量：1080p, 720p, 480p, 360p
   - 支持的格式：mp4, webm
   - 默认下载最高质量

3. 错误处理
   - 建议实现请求重试机制
   - 处理网络超时情况
   - 验证响应数据完整性

4. 最佳实践
   - 使用批量接口提高效率
   - 合理设置并发数量
   - 实现断点续传
   - 添加请求超时设置 