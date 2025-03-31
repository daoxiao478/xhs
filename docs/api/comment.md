# 评论接口

本页面介绍 XHS1 提供的评论相关 API。

## 评论获取

### 获取视频评论列表

```http
GET /api/comment/list
```

获取视频的评论列表。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| videoId | string | 是 | 视频ID |
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
        "id": "comment123",
        "content": "评论内容",
        "author": {
          "id": "user123",
          "nickname": "评论者昵称",
          "avatar": "头像URL"
        },
        "stats": {
          "likes": 100,
          "replies": 10
        },
        "createTime": "2024-03-31T12:00:00Z"
      }
    ]
  }
}
```

### 获取评论回复列表

```http
GET /api/comment/replies
```

获取评论的回复列表。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| commentId | string | 是 | 评论ID |
| page | number | 否 | 页码，默认1 |
| size | number | 否 | 每页数量，默认20 |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 10,
    "items": [
      {
        "id": "reply123",
        "content": "回复内容",
        "author": {
          "id": "user456",
          "nickname": "回复者昵称",
          "avatar": "头像URL"
        },
        "replyTo": {
          "id": "user789",
          "nickname": "被回复者昵称"
        },
        "createTime": "2024-03-31T12:00:00Z"
      }
    ]
  }
}
```

### 批量获取评论

```http
POST /api/comment/batch
```

批量获取多个视频的评论。

#### 请求参数

```json
{
  "videos": [
    {
      "videoId": "video123",
      "page": 1,
      "size": 20
    },
    {
      "videoId": "video456",
      "page": 1,
      "size": 20
    }
  ]
}
```

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "video123": {
      "total": 100,
      "items": [
        {
          "id": "comment123",
          "content": "评论内容"
        }
      ]
    },
    "video456": {
      "total": 50,
      "items": [
        {
          "id": "comment456",
          "content": "评论内容"
        }
      ]
    }
  }
}
```

## 评论分析

### 获取评论统计

```http
GET /api/comment/stats
```

获取视频评论的统计信息。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| videoId | string | 是 | 视频ID |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 1000,
    "stats": {
      "totalComments": 1000,
      "totalReplies": 500,
      "avgLikes": 50,
      "maxLikes": 200,
      "commentFrequency": {
        "daily": 100,
        "weekly": 500,
        "monthly": 1000
      },
      "topCommenters": [
        {
          "id": "user123",
          "nickname": "用户昵称",
          "count": 10
        }
      ]
    }
  }
}
```

### 获取评论情感分析

```http
GET /api/comment/sentiment
```

获取评论的情感分析结果。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| videoId | string | 是 | 视频ID |
| type | string | 否 | 分析类型(basic/detailed) |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "overview": {
      "positive": 60,
      "neutral": 30,
      "negative": 10
    },
    "details": {
      "keywords": [
        {
          "word": "好看",
          "count": 50,
          "sentiment": "positive"
        }
      ],
      "topics": [
        {
          "topic": "画面",
          "sentiment": "positive",
          "count": 30
        }
      ]
    }
  }
}
```

## 评论导出

### 导出评论数据

```http
GET /api/comment/export
```

导出视频评论数据。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| videoId | string | 是 | 视频ID |
| format | string | 否 | 导出格式(csv/xlsx/json) |
| includeReplies | boolean | 否 | 是否包含回复 |

#### 响应

文件流，根据指定格式返回文件。

### 批量导出评论

```http
POST /api/comment/export/batch
```

批量导出多个视频的评论数据。

#### 请求参数

```json
{
  "videos": [
    "video123",
    "video456"
  ],
  "format": "xlsx",
  "includeReplies": true,
  "options": {
    "includeStats": true,
    "includeSentiment": true
  }
}
```

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_123",
    "status": "processing"
  }
}
```

### 获取导出进度

```http
GET /api/comment/export/progress
```

获取批量导出任务的进度。

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
    "taskId": "task_123",
    "progress": 50,
    "status": "processing",
    "files": [
      {
        "videoId": "video123",
        "status": "completed",
        "url": "下载链接"
      }
    ]
  }
}
```

## 错误码

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 3001 | 参数错误 |
| 3002 | 视频不存在 |
| 3003 | 评论不存在 |
| 3004 | 导出失败 |
| 3005 | 任务不存在 |
| 3006 | 服务器错误 |

## 使用示例

### cURL

```bash
# 获取评论列表
curl -X GET "http://localhost:3000/api/comment/list?videoId=video123&page=1&size=20"

# 导出评论
curl -X GET "http://localhost:3000/api/comment/export?videoId=video123&format=csv" --output comments.csv

# 批量导出评论
curl -X POST "http://localhost:3000/api/comment/export/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "videos": ["video123", "video456"],
    "format": "xlsx"
  }'
```

### JavaScript

```javascript
// 获取评论列表
async function getComments(videoId, page = 1, size = 20) {
  const response = await fetch(`/api/comment/list?videoId=${videoId}&page=${page}&size=${size}`);
  const data = await response.json();
  return data;
}

// 获取评论统计
async function getCommentStats(videoId) {
  const response = await fetch(`/api/comment/stats?videoId=${videoId}`);
  const data = await response.json();
  return data;
}

// 导出评论
async function exportComments(videoId, format = 'csv') {
  const response = await fetch(`/api/comment/export?videoId=${videoId}&format=${format}`);
  const blob = await response.blob();
  return blob;
}
```

### Python

```python
import requests

# 获取评论列表
def get_comments(video_id, page=1, size=20):
    response = requests.get(
        "http://localhost:3000/api/comment/list",
        params={
            "videoId": video_id,
            "page": page,
            "size": size
        }
    )
    return response.json()

# 导出评论
def export_comments(video_id, format="csv"):
    response = requests.get(
        "http://localhost:3000/api/comment/export",
        params={
            "videoId": video_id,
            "format": format
        }
    )
    return response.content

# 批量导出评论
def batch_export_comments(videos, format="xlsx"):
    response = requests.post(
        "http://localhost:3000/api/comment/export/batch",
        json={
            "videos": videos,
            "format": format
        }
    )
    return response.json()
```

## 注意事项

1. 请求限制
   - API 调用频率限制：60次/分钟
   - 批量请求数量限制：20个/批
   - 导出大小限制：10MB/文件

2. 数据获取
   - 评论数据可能不完整
   - 部分评论可能被删除
   - 考虑评论时效性

3. 导出处理
   - 大量数据导出耗时较长
   - 建议使用异步导出
   - 注意保存导出文件

4. 最佳实践
   - 使用批量接口提高效率
   - 实现数据缓存机制
   - 处理评论数据更新
   - 注意敏感信息过滤 