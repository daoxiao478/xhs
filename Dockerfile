# 构建阶段
FROM oven/bun:1 as builder

# 安装构建依赖
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 复制 package.json 和 lock 文件
COPY package*.json ./
COPY bun.lockb ./

# 安装依赖
RUN bun install

# 复制源代码
COPY . .

# 构建应用
RUN bun run build

# 运行阶段
FROM oven/bun:1-slim

# 安装 Playwright 依赖
RUN apt-get update && apt-get install -y \
    python3 \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# 安装 Playwright 浏览器
RUN bunx playwright install

WORKDIR /app

# 从构建阶段复制构建产物和源代码
COPY --from=builder /app/.output ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/hono ./hono
COPY start.sh ./

# 设置环境变量
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV PYTHON=/usr/bin/python3

# 设置启动脚本权限
RUN chmod +x ./start.sh

# 暴露端口
EXPOSE 3000
EXPOSE 3001

# 启动应用
CMD ["./start.sh"] 