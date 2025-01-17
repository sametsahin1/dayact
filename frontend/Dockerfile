# Build aşaması
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Production aşaması
FROM nginx:alpine

# Nginx konfigürasyonunu kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build çıktısını kopyala
COPY --from=build /app/dist /usr/share/nginx/html/apps/dayact

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"] 