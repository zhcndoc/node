FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npx @node-core/doc-kit generate \
    --config-file doc-kit.config.mjs

FROM zeabur/caddy-static AS runtime
COPY --from=builder /app/out /usr/share/caddy
