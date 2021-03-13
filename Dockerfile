FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY --chown=node:node . .

RUN npm run build && npm prune --production && \
    mkdir release && \
    mv dist release && \
    mv node_modules release

FROM node:lts-alpine as production

RUN apk add dumb-init

ENV NODE_ENV production
ENV SERVICE Template
ENV PORT 4000

WORKDIR /app

COPY  --chown=node:node --from=build /app/release .

USER node

CMD ["dumb-init", "node", "dist/index.js"]