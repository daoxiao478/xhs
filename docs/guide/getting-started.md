# 快速开始

本指南将帮助您快速上手 XHS1，了解基本的使用流程。

## 前置要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器
- 现代浏览器（推荐 Chrome 或 Edge）

## 安装步骤

1. 克隆项目代码：

```bash
git clone https://github.com/xiaoxiunique/xhs.git
cd xhs
```

2. 安装依赖：

```bash
npm install
# 或者使用 yarn
yarn install
```

3. 启动开发服务器：

```bash
npm run dev
# 或者使用 yarn
yarn dev
```

4. 在浏览器中访问 `http://localhost:3000`

## 基本使用

### 1. 配置代理（可选）

为了保护您的账号安全，建议配置代理：

1. 点击右上角的设置图标
2. 进入代理设置页面
3. 添加您的代理服务器地址
4. 保存设置

### 2. 下载视频

1. 复制小红书视频链接
2. 粘贴到输入框中
3. 点击下载按钮
4. 等待下载完成

### 3. 获取评论

1. 输入笔记 ID 或链接
2. 选择评论获取选项
3. 点击获取按钮
4. 导出评论数据

## 常见问题

### Q: 如何获取笔记 ID？
A: 在小红书笔记链接中，形如 `https://www.xiaohongshu.com/explore/[ID]` 的部分即为笔记 ID。

### Q: 下载失败怎么办？
A: 可以尝试以下方法：
- 检查网络连接
- 更换代理服务器
- 确认链接是否有效
- 等待一段时间后重试

## 下一步

- [安装指南](/guide/installation) - 获取详细的安装说明
- [代理设置](/guide/proxy-settings) - 了解如何配置代理
- [数据持久化](/guide/data-persistence) - 了解如何管理下载的数据 