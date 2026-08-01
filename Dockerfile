# 飞鱼丸工作台 · 后端 + 前端 一体镜像
# 同时适用于 Render 与 Railway（均支持从仓库 Dockerfile 构建）
FROM node:20-alpine

WORKDIR /app

# 先拷贝依赖清单，利用层缓存加速重建
COPY package.json ./
RUN npm install --omit=dev

# 拷贝全部应用代码（含 public/ 与构建时 data.json）
COPY . .

# Render / Railway 会注入 PORT；本地默认 3000
ENV PORT=3000
EXPOSE 3000

# 健康检查：访问 /api/data 返回 200 即视为健康
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:'+(process.env.PORT||3000)+'/api/data',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
