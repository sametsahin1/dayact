#!/bin/bash

echo "🚀 DayAct Güncelleme Başlatılıyor..."

# Git değişikliklerini çek
echo "📥 Git değişiklikleri kontrol ediliyor..."
git pull

# Frontend build dosyalarını temizle
echo "🧹 Eski build dosyaları temizleniyor..."
sudo rm -rf /usr/share/nginx/html/apps/dayact/*

# Docker imajlarını yeniden oluştur ve başlat
echo "🔄 Docker servisleri yeniden başlatılıyor..."
docker-compose down
docker-compose up -d --build

# Nginx'i yeniden başlat
echo "🔄 Nginx yeniden başlatılıyor..."
sudo systemctl restart nginx

echo "✅ Güncelleme tamamlandı!" 