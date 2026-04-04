FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npx @node-core/doc-kit generate \
    -t web \
    -t orama-db \
    -i "doc/api/*.md" \
    -o out \
    --index doc/api/index.md

FROM zeabur/caddy-static AS runtime
COPY --from=builder /app/out /usr/share/caddy
