# 环境变量

本页面介绍 XHS1 支持的环境变量配置。

## 配置方法

### 方法一：.env 文件

在项目根目录创建 `.env` 文件：

```env
# 应用配置
APP_PORT=3000
APP_ENV=development
APP_DEBUG=true

# 数据库配置
DB_TYPE=sqlite
DB_PATH=./data/xhs1.db

# 代理配置
PROXY_ENABLED=true
PROXY_HOST=127.0.0.1
PROXY_PORT=7890

# 下载配置
DOWNLOAD_PATH=~/Downloads/xhs-videos
DOWNLOAD_CONCURRENT=3
```

### 方法二：系统环境变量

Windows PowerShell:
```powershell
$env:APP_PORT=3000
$env:PROXY_ENABLED=true
```

Linux/macOS:
```bash
export APP_PORT=3000
export PROXY_ENABLED=true
```

## 环境变量列表

### 应用配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| APP_PORT | number | 3000 | 应用端口 |
| APP_ENV | string | development | 运行环境 (development/production) |
| APP_DEBUG | boolean | false | 调试模式 |
| APP_NAME | string | XHS1 | 应用名称 |
| APP_URL | string | http://localhost | 应用URL |
| APP_LOCALE | string | zh-CN | 默认语言 |
| APP_TIMEZONE | string | Asia/Shanghai | 时区设置 |

### 数据库配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| DB_TYPE | string | sqlite | 数据库类型 |
| DB_PATH | string | ./data/xhs1.db | SQLite数据库路径 |
| DB_HOST | string | localhost | 数据库主机 |
| DB_PORT | number | 3306 | 数据库端口 |
| DB_USER | string | - | 数据库用户名 |
| DB_PASSWORD | string | - | 数据库密码 |
| DB_NAME | string | xhs1 | 数据库名称 |

### 代理配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| PROXY_ENABLED | boolean | false | 启用代理 |
| PROXY_HOST | string | 127.0.0.1 | 代理主机 |
| PROXY_PORT | number | 7890 | 代理端口 |
| PROXY_USERNAME | string | - | 代理用户名 |
| PROXY_PASSWORD | string | - | 代理密码 |
| PROXY_PROTOCOL | string | http | 代理协议 |

### 下载配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| DOWNLOAD_PATH | string | ~/Downloads/xhs-videos | 下载路径 |
| DOWNLOAD_CONCURRENT | number | 3 | 并发数 |
| DOWNLOAD_RETRY | number | 3 | 重试次数 |
| DOWNLOAD_TIMEOUT | number | 30000 | 超时时间(ms) |
| DOWNLOAD_FILENAME_TEMPLATE | string | {author}-{title} | 文件名模板 |

### 缓存配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| CACHE_DRIVER | string | file | 缓存驱动 |
| CACHE_PREFIX | string | xhs1 | 缓存前缀 |
| CACHE_TTL | number | 3600 | 缓存时间(s) |
| CACHE_PATH | string | ./cache | 缓存路径 |

### 日志配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| LOG_LEVEL | string | info | 日志级别 |
| LOG_PATH | string | ./logs | 日志路径 |
| LOG_MAX_FILES | number | 30 | 最大文件数 |
| LOG_FORMAT | string | combined | 日志格式 |

## 环境变量优先级

1. 命令行参数
2. 系统环境变量
3. .env 文件
4. 默认值

## 开发环境配置

### 开发环境示例

```env
# 开发环境配置
APP_ENV=development
APP_DEBUG=true
APP_PORT=3000

# 数据库配置
DB_TYPE=sqlite
DB_PATH=./data/dev.db

# 日志配置
LOG_LEVEL=debug
LOG_FORMAT=dev

# 代理配置
PROXY_ENABLED=true
PROXY_HOST=localhost
PROXY_PORT=7890
```

### 测试环境示例

```env
# 测试环境配置
APP_ENV=testing
APP_DEBUG=true
APP_PORT=3001

# 数据库配置
DB_TYPE=sqlite
DB_PATH=./data/test.db

# 日志配置
LOG_LEVEL=debug
LOG_FORMAT=test
```

## 生产环境配置

### 生产环境示例

```env
# 生产环境配置
APP_ENV=production
APP_DEBUG=false
APP_PORT=3000

# 数据库配置
DB_TYPE=sqlite
DB_PATH=/data/xhs1.db

# 日志配置
LOG_LEVEL=info
LOG_FORMAT=combined

# 代理配置
PROXY_ENABLED=true
PROXY_HOST=proxy.example.com
PROXY_PORT=8080
```

## 最佳实践

### 安全性

1. 敏感信息加密
   - 使用环境变量存储敏感信息
   - 避免将密码等信息提交到版本控制
   - 使用加密的配置文件

2. 文件权限
   - 限制 .env 文件访问权限
   - 定期轮换密钥和密码
   - 使用安全的存储位置

### 开发流程

1. 环境隔离
   - 使用不同的 .env 文件
   - 区分开发/测试/生产环境
   - 避免环境配置混淆

2. 版本控制
   - 提供 .env.example 模板
   - 不要提交 .env 文件
   - 记录配置变更历史

### 部署管理

1. 自动化配置
   - 使用部署脚本
   - 自动生成配置文件
   - 验证配置有效性

2. 监控和日志
   - 记录配置变更
   - 监控敏感配置
   - 定期审计配置

## 常见问题

### 配置未生效

检查步骤：
1. 确认环境变量名称正确
2. 检查变量值格式
3. 验证文件权限
4. 重启应用程序

### 配置冲突

解决方法：
1. 检查配置优先级
2. 清理重复配置
3. 使用正确的格式
4. 更新配置文档

## 相关链接

- [基础配置](/config/basic)
- [代理配置](/config/proxy)
- [常见问题](/guide/faq) 