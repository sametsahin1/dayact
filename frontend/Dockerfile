# Development için Dockerfile
FROM node:18

WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Vite dev server portu
EXPOSE 5173

# Development modunda çalıştır
CMD ["npm", "run", "dev"] 