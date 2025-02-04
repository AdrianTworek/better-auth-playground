FROM node:20.12.2-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.2.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY apps/server ./apps/server/

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/server

CMD ["pnpm", "start"] 