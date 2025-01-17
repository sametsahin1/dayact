# Build aşaması
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Production aşaması
FROM nginx:alpine

# Build çıktısını doğrudan sunucu dizinine kopyala
COPY --from=build /app/dist /var/www/yazilimservisi.com/apps/dayact

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"] 