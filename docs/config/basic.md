# 基础配置

本页面介绍 XHS1 的基本配置项。

## 配置文件

XHS1 的配置文件位于以下位置：

- Windows: `%APPDATA%/xhs1/config/settings.json`
- macOS: `~/Library/Application Support/xhs1/config/settings.json`
- Linux: `~/.config/xhs1/config/settings.json`

## 配置项

### 基本设置

```json
{
  // 下载设置
  "download": {
    "path": "~/Downloads/xhs-videos",    // 下载保存路径
    "filename_template": "{author}-{title}-{date}",  // 文件名模板
    "concurrent": 3,                     // 并发下载数
    "retry": 3,                         // 重试次数
    "timeout": 30000,                   // 超时时间（毫秒）
    "auto_rename": true                 // 自动重命名
  },

  // 界面设置
  "ui": {
    "theme": "light",                   // 主题：light/dark/system
    "language": "zh-CN",                // 界面语言
    "font_size": "medium",              // 字体大小
    "compact_mode": false               // 紧凑模式
  },

  // 通知设置
  "notification": {
    "enabled": true,                    // 启用通知
    "sound": true,                      // 声音提醒
    "position": "top-right",            // 通知位置
    "duration": 5000                    // 显示时长（毫秒）
  },

  // 性能设置
  "performance": {
    "cache_size": 500,                  // 缓存大小（MB）
    "auto_clean": true,                 // 自动清理
    "clean_interval": 7,                // 清理间隔（天）
    "max_history": 1000                 // 最大历史记录数
  }
}
```

### 下载设置

#### 文件名模板变量

| 变量 | 描述 | 示例 |
|------|------|------|
| {author} | 作者昵称 | "小红书用户" |
| {title} | 视频标题 | "我的第一个视频" |
| {date} | 发布日期 | "2024-03-31" |
| {id} | 视频ID | "12345678" |
| {timestamp} | 下载时间戳 | "1648732800" |

#### 并发设置

- `concurrent`: 同时下载的最大数量
  - 推荐值：2-5
  - 过高可能导致 IP 被限制
  - 过低会影响下载效率

#### 重试机制

- `retry`: 下载失败后的重试次数
- `retry_delay`: 重试间隔（秒）
- `retry_codes`: 需要重试的错误码列表

### 界面设置

#### 主题选项

- `light`: 浅色主题
- `dark`: 深色主题
- `system`: 跟随系统

#### 语言支持

- `zh-CN`: 简体中文
- `en-US`: 英文
- `ja-JP`: 日文

### 通知设置

#### 通知类型

- 下载完成
- 下载失败
- 更新提醒
- 系统消息

#### 通知位置

- `top-right`: 右上角
- `top-left`: 左上角
- `bottom-right`: 右下角
- `bottom-left`: 左下角

### 性能设置

#### 缓存管理

- `cache_size`: 缓存大小限制
- `cache_type`: 缓存类型
  - `memory`: 内存缓存
  - `disk`: 磁盘缓存
  - `both`: 双重缓存

#### 自动清理规则

- 清理时机
  - 启动时
  - 定期清理
  - 空间不足时

- 清理对象
  - 过期缓存
  - 历史记录
  - 临时文件

## 配置示例

### 基本配置

```json
{
  "download": {
    "path": "~/Downloads/xhs-videos",
    "filename_template": "{author}-{title}",
    "concurrent": 3
  },
  "ui": {
    "theme": "system",
    "language": "zh-CN"
  },
  "notification": {
    "enabled": true,
    "sound": true
  }
}
```

### 高级配置

```json
{
  "download": {
    "path": "~/Downloads/xhs-videos",
    "filename_template": "{author}/{date}-{title}",
    "concurrent": 3,
    "retry": 5,
    "timeout": 60000,
    "auto_rename": true,
    "save_metadata": true
  },
  "ui": {
    "theme": "dark",
    "language": "zh-CN",
    "font_size": "large",
    "compact_mode": true,
    "custom_css": "path/to/custom.css"
  },
  "notification": {
    "enabled": true,
    "sound": true,
    "position": "top-right",
    "duration": 3000,
    "custom_sound": "path/to/sound.mp3"
  },
  "performance": {
    "cache_size": 1000,
    "auto_clean": true,
    "clean_interval": 3,
    "max_history": 2000,
    "compression": true
  }
}
```

## 最佳实践

### 性能优化

1. 合理设置并发数
2. 启用缓存压缩
3. 定期清理缓存
4. 限制历史记录数量

### 存储管理

1. 选择合适的存储路径
2. 定期备份配置
3. 监控存储空间
4. 及时清理无用数据

### 用户体验

1. 根据设备选择主题
2. 配置合适的通知
3. 优化文件命名
4. 调整界面布局

## 常见问题

### 配置不生效

可能原因：
1. 配置文件格式错误
2. 权限问题
3. 配置未保存
4. 程序未重启

### 存储路径问题

解决方法：
1. 检查路径权限
2. 使用绝对路径
3. 确保目录存在
4. 避免特殊字符

## 相关链接

- [环境变量](/config/env)
- [代理配置](/config/proxy)
- [常见问题](/guide/faq) 