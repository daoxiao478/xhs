# 用户接口

本页面介绍 XHS1 提供的用户相关 API。

## 用户信息

### 获取用户信息

```http
GET /api/user/info
```

获取用户的详细信息。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 用户ID |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "user123",
    "nickname": "用户昵称",
    "avatar": "头像URL",
    "description": "个人简介",
    "stats": {
      "followers": 1000,
      "following": 100,
      "likes": 5000
    },
    "createTime": "2024-03-31T12:00:00Z",
    "updateTime": "2024-03-31T12:00:00Z"
  }
}
```

### 批量获取用户信息

```http
POST /api/user/info/batch
```

批量获取多个用户的信息。

#### 请求参数

```json
{
  "userIds": [
    "user123",
    "user456"
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
      "id": "user123",
      "nickname": "用户1",
      "avatar": "头像URL1"
    },
    {
      "id": "user456",
      "nickname": "用户2",
      "avatar": "头像URL2"
    }
  ]
}
```

## 用户作品

### 获取用户视频列表

```http
GET /api/user/videos
```

获取用户发布的视频列表。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| userId | string | 是 | 用户ID |
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
        "id": "video123",
        "title": "视频标题",
        "cover": "封面URL",
        "stats": {
          "likes": 1000,
          "comments": 100
        },
        "createTime": "2024-03-31T12:00:00Z"
      }
    ]
  }
}
```

### 获取用户收藏列表

```http
GET /api/user/favorites
```

获取用户收藏的视频列表。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| userId | string | 是 | 用户ID |
| page | number | 否 | 页码，默认1 |
| size | number | 否 | 每页数量，默认20 |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 50,
    "items": [
      {
        "id": "video456",
        "title": "收藏的视频",
        "author": {
          "id": "user789",
          "nickname": "作者昵称"
        },
        "createTime": "2024-03-31T12:00:00Z"
      }
    ]
  }
}
```

## 用户关系

### 获取关注列表

```http
GET /api/user/following
```

获取用户关注的用户列表。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| userId | string | 是 | 用户ID |
| page | number | 否 | 页码，默认1 |
| size | number | 否 | 每页数量，默认20 |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 100,
    "items": [
      {
        "id": "user789",
        "nickname": "关注的用户",
        "avatar": "头像URL",
        "followTime": "2024-03-31T12:00:00Z"
      }
    ]
  }
}
```

### 获取粉丝列表

```http
GET /api/user/followers
```

获取用户的粉丝列表。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| userId | string | 是 | 用户ID |
| page | number | 否 | 页码，默认1 |
| size | number | 否 | 每页数量，默认20 |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 1000,
    "items": [
      {
        "id": "user101",
        "nickname": "粉丝昵称",
        "avatar": "头像URL",
        "followTime": "2024-03-31T12:00:00Z"
      }
    ]
  }
}
```

## 用户搜索

### 搜索用户

```http
GET /api/user/search
```

搜索用户。

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 是 | 搜索关键词 |
| page | number | 否 | 页码，默认1 |
| size | number | 否 | 每页数量，默认20 |
| sort | string | 否 | 排序方式(fans/time) |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 100,
    "items": [
      {
        "id": "user123",
        "nickname": "匹配的用户",
        "avatar": "头像URL",
        "stats": {
          "followers": 1000,
          "videos": 50
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
| 2001 | 参数错误 |
| 2002 | 用户不存在 |
| 2003 | 无权限访问 |
| 2004 | 请求频率限制 |
| 2005 | 服务器错误 |

## 使用示例

### cURL

```bash
# 获取用户信息
curl -X GET "http://localhost:3000/api/user/info?id=user123"

# 获取用户视频列表
curl -X GET "http://localhost:3000/api/user/videos?userId=user123&page=1&size=20"

# 搜索用户
curl -X GET "http://localhost:3000/api/user/search?keyword=关键词&page=1&size=20"
```

### JavaScript

```javascript
// 获取用户信息
async function getUserInfo(userId) {
  const response = await fetch(`/api/user/info?id=${userId}`);
  const data = await response.json();
  return data;
}

// 获取用户视频列表
async function getUserVideos(userId, page = 1, size = 20) {
  const response = await fetch(`/api/user/videos?userId=${userId}&page=${page}&size=${size}`);
  const data = await response.json();
  return data;
}

// 搜索用户
async function searchUsers(keyword, page = 1, size = 20) {
  const response = await fetch(`/api/user/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
  const data = await response.json();
  return data;
}
```

### Python

```python
import requests

# 获取用户信息
def get_user_info(user_id):
    response = requests.get(
        "http://localhost:3000/api/user/info",
        params={"id": user_id}
    )
    return response.json()

# 获取用户视频列表
def get_user_videos(user_id, page=1, size=20):
    response = requests.get(
        "http://localhost:3000/api/user/videos",
        params={
            "userId": user_id,
            "page": page,
            "size": size
        }
    )
    return response.json()

# 搜索用户
def search_users(keyword, page=1, size=20):
    response = requests.get(
        "http://localhost:3000/api/user/search",
        params={
            "keyword": keyword,
            "page": page,
            "size": size
        }
    )
    return response.json()
```

## 注意事项

1. 请求限制
   - API 调用频率限制：60次/分钟
   - 批量请求数量限制：20个/批
   - 搜索频率限制：10次/分钟

2. 数据缓存
   - 用户信息缓存时间：5分钟
   - 关注列表缓存时间：10分钟
   - 视频列表缓存时间：1分钟

3. 错误处理
   - 实现请求重试机制
   - 处理网络超时情况
   - 验证响应数据完整性

4. 最佳实践
   - 使用批量接口提高效率
   - 实现数据缓存机制
   - 添加错误重试逻辑
   - 处理大数据量分页 