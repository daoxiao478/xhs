# 数据持久化

本页面介绍 XHS1 的数据持久化功能，包括数据存储、备份和恢复等功能。

## 数据类型

XHS1 会持久化存储以下类型的数据：

- 下载记录
- 用户配置
- 代理设置
- 历史搜索
- 统计数据

## 存储位置

### 默认存储路径

- Windows: `%APPDATA%/xhs1/`
- macOS: `~/Library/Application Support/xhs1/`
- Linux: `~/.config/xhs1/`

### 目录结构

```
xhs1/
├── config/
│   ├── settings.json    # 用户配置
│   ├── proxy.json      # 代理设置
│   └── theme.json      # 主题设置
├── data/
│   ├── downloads.db    # 下载记录
│   ├── history.db      # 历史记录
│   └── stats.json      # 统计数据
└── cache/              # 缓存文件
```

## 数据管理

### 配置文件

#### settings.json

用户基本配置：

```json
{
  "downloadPath": "~/Downloads/xhs-videos",
  "autoUpdate": true,
  "notification": {
    "enabled": true,
    "sound": true
  },
  "language": "zh-CN",
  "theme": "light"
}
```

#### proxy.json

代理服务器配置：

```json
{
  "enabled": true,
  "current": "proxy1",
  "proxies": {
    "proxy1": {
      "host": "proxy1.example.com",
      "port": 8080
    }
  }
}
```

### 数据库

XHS1 使用 SQLite 数据库存储结构化数据：

#### downloads.db

下载记录表结构：

```sql
CREATE TABLE downloads (
  id INTEGER PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  author TEXT,
  status TEXT,
  path TEXT,
  created_at DATETIME,
  updated_at DATETIME
);
```

#### history.db

历史记录表结构：

```sql
CREATE TABLE history (
  id INTEGER PRIMARY KEY,
  type TEXT,
  content TEXT,
  timestamp DATETIME
);
```

## 数据备份

### 自动备份

1. 启用自动备份
   - 进入设置页面
   - 开启"自动备份"
   - 设置备份周期
   - 选择备份位置

2. 备份内容
   - 配置文件
   - 数据库文件
   - 统计数据
   - 自定义设置

3. 备份策略
   - 定期备份
   - 增量备份
   - 版本控制

### 手动备份

1. 导出数据
   - 点击"导出数据"
   - 选择导出内容
   - 选择保存位置
   - 确认导出

2. 备份文件格式
   - 配置文件：JSON
   - 数据库：SQLite
   - 导出包：ZIP

## 数据恢复

### 从备份恢复

1. 选择备份
   - 点击"恢复数据"
   - 选择备份文件
   - 选择恢复内容

2. 恢复选项
   - 完全恢复
   - 选择性恢复
   - 合并数据

### 数据迁移

1. 导出当前数据
   - 导出所有数据
   - 选择导出格式

2. 导入新设备
   - 安装相同版本
   - 导入数据包
   - 验证数据

## 数据清理

### 自动清理

- 清理临时文件
- 清理过期缓存
- 清理旧备份
- 优化数据库

### 手动清理

1. 清理选项
   - 清理下载记录
   - 清理搜索历史
   - 清理缓存数据
   - 重置设置

2. 数据优化
   - 压缩数据库
   - 删除重复数据
   - 整理存储空间

## 最佳实践

### 数据安全

1. 定期备份
   - 设置自动备份
   - 保留多个版本
   - 使用安全存储

2. 加密敏感数据
   - 配置文件加密
   - 数据库加密
   - 安全传输

### 性能优化

1. 定期维护
   - 清理无用数据
   - 优化数据库
   - 压缩备份文件

2. 存储管理
   - 监控存储空间
   - 设置保留策略
   - 自动清理机制

## 常见问题

### 数据损坏

解决步骤：
1. 停止应用
2. 备份现有数据
3. 使用备份恢复
4. 验证数据完整性

### 存储空间不足

处理方法：
1. 清理缓存
2. 删除旧数据
3. 压缩数据库
4. 迁移存储位置

### 备份失败

排查方向：
1. 检查权限
2. 验证存储空间
3. 检查文件系统
4. 尝试手动备份

## 相关链接

- [配置参考](/config/basic)
- [环境变量](/config/env)
- [常见问题](/guide/faq) 