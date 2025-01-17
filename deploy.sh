#!/bin/bash

echo "🚀 DayAct Deployment Başlatılıyor..."

# Dizin yapısını kontrol et ve oluştur
sudo mkdir -p /var/www/yazilimservisi.com/apps/dayact
sudo chown -R www-data:www-data /var/www/yazilimservisi.com

# Frontend build
cd frontend
npm install
npm run build

# Build dosyalarını kopyala
sudo rm -rf /var/www/yazilimservisi.com/apps/dayact/*
sudo cp -r dist/* /var/www/yazilimservisi.com/apps/dayact/

# İzinleri ayarla
sudo chown -R www-data:www-data /var/www/yazilimservisi.com/apps/dayact

# Nginx'i yeniden başlat
sudo systemctl restart nginx

echo "✅ Deployment tamamlandı!" 