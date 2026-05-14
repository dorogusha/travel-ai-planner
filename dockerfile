FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD ["npm", "run", "preview"]