#!/bin/bash

echo "🚀 DayAct Deployment Başlatılıyor..."

# Çalışma dizinini kontrol et
APPS_DIR="/var/www/yazilimservisi.com/apps"
DAYACT_DIR="$APPS_DIR/dayact"

# Apps dizinini kontrol et ve oluştur
if [ ! -d "$APPS_DIR" ]; then
    echo "📁 Apps dizini oluşturuluyor..."
    sudo mkdir -p "$APPS_DIR"
fi

# DayAct dizinini temizle ve yeniden oluştur
echo "🧹 DayAct dizini hazırlanıyor..."
sudo rm -rf "$DAYACT_DIR"
sudo mkdir -p "$DAYACT_DIR"

# Git'ten projeyi çek
echo "📥 Proje indiriliyor..."
cd "$APPS_DIR"
sudo git clone https://github.com/sametsahin1/dayact.git

# Frontend build
echo "🏗️ Frontend build yapılıyor..."
cd "$DAYACT_DIR/frontend"
npm install
npm run build

# Build dosyalarını kopyala
echo "📦 Dosyalar kopyalanıyor..."
sudo cp -r dist/* "$DAYACT_DIR/"

# İzinleri ayarla
echo "🔒 İzinler ayarlanıyor..."
sudo chown -R www-data:www-data "$DAYACT_DIR"

# Nginx'i yeniden başlat
echo "🔄 Nginx yeniden başlatılıyor..."
sudo systemctl restart nginx

echo "✅ Deployment tamamlandı!" 