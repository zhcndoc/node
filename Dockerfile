FROM node:lts AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM zeabur/caddy-static AS runtime
COPY --from=builder /app/out /usr/share/caddy
