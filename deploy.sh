#!/bin/bash

echo "🚀 DayAct Deployment Başlatılıyor..."

APPS_DIR="/var/www/yazilimservisi.com/apps"
DAYACT_DIR="$APPS_DIR/dayact"

# Temizlik
echo "🧹 Eski dosyalar temizleniyor..."
sudo rm -rf "$DAYACT_DIR"
sudo mkdir -p "$DAYACT_DIR"

# Projeyi çek
echo "📥 Proje indiriliyor..."
cd "$APPS_DIR"
sudo git clone https://github.com/sametsahin1/dayact.git

# Frontend build
echo "🏗️ Frontend build yapılıyor..."
cd "$DAYACT_DIR/frontend"
npm install --legacy-peer-deps
npm run build

# Dosyaları kopyala
echo "📦 Dosyalar kopyalanıyor..."
if [ -d "dist" ]; then
    sudo cp -r dist/* "$DAYACT_DIR/"
else
    echo "❌ Build başarısız oldu!"
    exit 1
fi

# Backend başlat
echo "🚀 Backend başlatılıyor..."
cd "$DAYACT_DIR"
docker-compose down
docker-compose up -d --build

# İzinleri ayarla
echo "🔒 İzinler ayarlanıyor..."
sudo chown -R www-data:www-data "$DAYACT_DIR"

# Nginx yeniden başlat
echo "🔄 Nginx yeniden başlatılıyor..."
sudo systemctl restart nginx

echo "✅ Deployment tamamlandı!" 