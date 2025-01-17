#!/bin/bash

echo "🚀 DayAct Deployment Başlatılıyor..."

# Apps dizinini kontrol et
if [ ! -d "/var/www/yazilimservisi.com/apps" ]; then
    echo "📁 Apps dizini oluşturuluyor..."
    sudo mkdir -p /var/www/yazilimservisi.com/apps
    sudo chown -R www-data:www-data /var/www/yazilimservisi.com/apps
fi

# DayAct dizinini temizle ve oluştur
echo "🧹 DayAct dizini hazırlanıyor..."
sudo rm -rf /var/www/yazilimservisi.com/apps/dayact
sudo mkdir -p /var/www/yazilimservisi.com/apps/dayact

# Frontend build
echo "🏗️ Frontend build yapılıyor..."
cd frontend
npm install
npm run build

# Build dosyalarını kopyala
echo "📦 Dosyalar kopyalanıyor..."
sudo cp -r dist/* /var/www/yazilimservisi.com/apps/dayact/

# İzinleri ayarla
echo "🔒 İzinler ayarlanıyor..."
sudo chown -R www-data:www-data /var/www/yazilimservisi.com/apps/dayact

# Nginx'i yeniden başlat
echo "🔄 Nginx yeniden başlatılıyor..."
sudo systemctl restart nginx

echo "✅ Deployment tamamlandı!" 