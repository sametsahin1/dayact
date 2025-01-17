#!/bin/bash

echo "🚀 DayAct Güncelleme Başlatılıyor..."

# Git değişikliklerini çek
echo "📥 Git değişiklikleri kontrol ediliyor..."
git pull

# Docker imajlarını yeniden oluştur ve başlat
echo "🔄 Docker servisleri yeniden başlatılıyor..."
docker-compose down
docker-compose up -d --build

echo "✅ Güncelleme tamamlandı!" 