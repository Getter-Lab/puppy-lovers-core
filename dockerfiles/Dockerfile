# PRODUCTION DOCKERFILE

##  -- Pre-build image --
FROM node:20-alpine AS builder

ENV NODE_ENV=build
RUN apk update && apk add jq

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Generate metadata
RUN jq .version package.json -r > .package.version.txt
RUN jq .name package.json -r > .package.name.txt
RUN jq .description package.json -r > .package.description.txt

COPY . ./

# Db setup prisma
RUN npx prisma generate
COPY prisma ./prisma/


RUN npm run build
RUN npm prune --omit=dev

##  -- Build image --
FROM node:20-alpine

ENV NODE_ENV=production

# Timezone
ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# From builder
WORKDIR /app

COPY --from=builder /app/.package.*.txt /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/newrelic.js /app/dist/
COPY --from=builder /app/node_modules /app/node_modules

RUN addgroup -S app && adduser -S app -G app && \
    chown -R app.app /app/ && \
    chmod 756 /app

USER app

CMD PROJECT_VERSION=$(cat .package.version.txt) \
  PROJECT_NAME=$(cat .package.name.txt) \
  PROJECT_DESCRIPTION=$(cat .package.description.txt) \
  node dist/main
