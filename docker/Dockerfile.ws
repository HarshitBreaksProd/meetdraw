FROM node:24-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json turbo.json ./
COPY ./packages ./packages

COPY ./apps/ws-server/package.json ./apps/ws-server/package.json

RUN npm install -g pnpm

RUN pnpm install

COPY ./apps/ws-server ./apps/ws-server

RUN pnpm run db:generate

RUN pnpm run build:ws

EXPOSE 8080

CMD ["pnpm", "run", "start:ws"]