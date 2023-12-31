FROM node:18-alpine AS builder

LABEL Developer="Faisal Fawad"

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

USER node:node

CMD ["node", "build/index.js"]