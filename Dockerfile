# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

# Copiar el código y lo que se necesita
COPY src ./src

RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine
WORKDIR /app

# Solo deps de prod
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force

# App compilada
COPY --from=builder /app/dist ./dist

# Usuario no root
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 \
 && chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 8080
ENV PORT=8080
CMD ["node", "dist/index.js"]
