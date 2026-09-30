# Build the Angular application and its SSR Node server.
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Run the production Angular SSR server without shipping build dependencies.
FROM node:22-alpine AS runtime

ENV NODE_ENV=production \
    PORT=4000

WORKDIR /app

COPY --from=build --chown=node:node /app/dist/ace-multisport-arena ./dist/ace-multisport-arena

USER node

EXPOSE 4000

CMD ["node", "dist/ace-multisport-arena/server/server.mjs"]
