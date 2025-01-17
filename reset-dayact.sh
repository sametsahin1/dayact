#!/bin/bash

echo "🚀 DayAct Sıfırlama Başlatılıyor..."

# Mevcut dizini yedekle (isteğe bağlı)
if [ -d "/var/www/dayact" ]; then
    echo "📦 Mevcut projeyi yedekleme..."
    backup_date=$(date +%Y%m%d_%H%M%S)
    sudo mv /var/www/dayact "/var/www/dayact_backup_$backup_date"
fi

# Eski dizini temizle
echo "🧹 Eski proje dizini temizleniyor..."
sudo rm -rf /var/www/dayact

# Git'ten yeni kodu çek
echo "📥 Yeni kod indiriliyor..."
cd /var/www
sudo git clone https://github.com/your-username/dayact.git
cd dayact

# İzinleri ayarla
echo "🔒 İzinler ayarlanıyor..."
sudo chown -R www-data:www-data /var/www/dayact

# Deploy script'ini çalıştır
echo "🚀 Deployment başlatılıyor..."
chmod +x deploy.sh
./deploy.sh

echo "✅ DayAct sıfırlama tamamlandı!" 