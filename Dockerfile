# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Production Stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD npm run dev
