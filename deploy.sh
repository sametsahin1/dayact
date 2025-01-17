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

# vite.config.js'i güncelle
echo "⚙️ Vite konfigürasyonu güncelleniyor..."
cat > vite.config.js << EOL
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apps/dayact/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
EOL

# Build işlemini gerçekleştir
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