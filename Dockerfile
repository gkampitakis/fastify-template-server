FROM node:alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build && npm prune --production && \
    mkdir release && \
    mv dist release && \
    mv .env.* release && \
    mv node_modules release

FROM node:alpine as production

ENV NODE_ENV prd

WORKDIR /app

COPY --from=build /app/release .

USER node

CMD node dist/index.js