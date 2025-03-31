# 安装指南

本指南将详细介绍如何在不同环境下安装和配置 XHS1。

## 系统要求

### 必需条件
- Node.js 18.0 或更高版本
- npm 7.0 或更高版本，或 yarn 1.22 或更高版本
- Git

### 推荐条件
- 内存：4GB 以上
- 磁盘空间：500MB 以上
- 操作系统：
  - Windows 10/11
  - macOS 10.15 或更高版本
  - Linux（Ubuntu 20.04 或更高版本）

## 安装步骤

### 1. 安装 Node.js

首先，确保您的系统已安装 Node.js。您可以从 [Node.js 官网](https://nodejs.org/) 下载安装包。

验证安装：
```bash
node --version
npm --version
```

### 2. 安装 Git

如果您还没有安装 Git，请从 [Git 官网](https://git-scm.com/) 下载并安装。

验证安装：
```bash
git --version
```

### 3. 克隆项目

```bash
git clone https://github.com/xiaoxiunique/xhs.git
cd xhs
```

### 4. 安装依赖

使用 npm：
```bash
npm install
```

或使用 yarn：
```bash
yarn install
```

### 5. 环境配置

1. 复制环境变量模板：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，配置必要的环境变量：
```env
# 应用配置
APP_PORT=3000
APP_ENV=development

# 代理配置（可选）
PROXY_ENABLED=false
PROXY_HOST=
PROXY_PORT=
```

### 6. 启动应用

开发环境：
```bash
npm run dev
# 或
yarn dev
```

生产环境：
```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

## 开发工具配置

### VSCode 推荐扩展

为了获得更好的开发体验，我们推荐安装以下 VSCode 扩展：

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier
- Tailwind CSS IntelliSense

### 代码格式化配置

项目使用 ESLint 和 Prettier 进行代码格式化。配置文件已包含在项目中：

- `.eslintrc.js`
- `.prettierrc`

## 常见问题

### 依赖安装失败

如果遇到依赖安装失败，可以尝试：

1. 清除 npm 缓存：
```bash
npm cache clean --force
```

2. 使用淘宝镜像：
```bash
npm config set registry https://registry.npmmirror.com
```

3. 删除 node_modules 后重新安装：
```bash
rm -rf node_modules
npm install
```

### 端口占用

如果默认端口 (3000) 被占用，可以：

1. 在 `.env` 文件中修改 `APP_PORT`
2. 或使用命令行指定端口：
```bash
npm run dev -- --port 3001
```

## 下一步

- [基础配置](/config/basic) - 配置应用
- [代理设置](/guide/proxy-settings) - 设置代理
- [视频下载](/guide/video-download) - 开始使用主要功能 