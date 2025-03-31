# XHS Web

一个基于 Nuxt.js 3 开发的小红书工具网站，提供视频下载和其他实用功能。


https://github.com/user-attachments/assets/e817a763-dced-4123-936a-0bb1fdd6f386



## 🚀 功能特性

- 📱 现代化的用户界面，使用 shadcn-nuxt UI 组件
- 🔄 多代理支持，自动轮换下载代理
- 🎯 帖子, 评论浏览导出功能
- 💾 本地数据持久化
- 🌐 完整的代理设置功能

## 🛠️ 技术栈

- [Nuxt 3](https://nuxt.com/) - Vue.js 框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Pinia](https://pinia.vuejs.org/) - Vue.js 状态管理
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [Shadcn-nuxt](https://www.shadcn-vue.com/) - UI 组件库
- [Playwright](https://playwright.dev/) - 浏览器自动化
- [Hono](https://hono.dev/) - 轻量级 Web 框架

## 📦 安装

确保你的开发环境中已安装 Node.js (推荐 v18+) 和 Bun。

```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd xhs-web

# 安装依赖
bun install

# 安装 Playwright 浏览器
npx playwright install

# 启动开发服务器
bun run dev
```

> **注意**: 本项目使用 Playwright 进行浏览器自动化操作，首次安装时需要下载浏览器。如果遇到浏览器相关错误，请确保已执行 `npx playwright install` 命令。

## 🔧 配置

### 代理设置

1. 进入设置页面
2. 在"代理设置"部分添加或修改代理地址
3. 支持添加多个代理地址，系统会自动轮换使用
4. 点击"保存更改"使设置生效

## 🚀 部署

```bash
# 构建生产版本
bun run build

# 预览生产构建
bun run preview
```

## 📝 使用说明

1. 启动应用后，访问主页面
2. 根据需要配置代理设置
3. 开始使用下载等功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE)
