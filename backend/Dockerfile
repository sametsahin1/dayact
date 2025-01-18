FROM node:18

WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

EXPOSE 5001

# Development modunda çalıştır
CMD ["npm", "run", "dev"] 