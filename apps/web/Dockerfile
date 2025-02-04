FROM node:20.12.2-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.2.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY apps/web ./apps/web/

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/web

CMD ["pnpm", "dev"] 