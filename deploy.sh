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

# Gerekli dizinleri oluştur
echo "📁 Dizin yapısı oluşturuluyor..."
cd "$DAYACT_DIR"
mkdir -p frontend/src/features/logs

# logSlice.js dosyasını oluştur
echo "⚙️ Log modülü oluşturuluyor..."
cat > frontend/src/features/logs/logSlice.js << 'EOL'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import logService from './logService'

const initialState = {
  logs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getLogs = createAsyncThunk(
  'logs/getAll',
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await logService.getLogs(token, filters)
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const resetAllData = createAsyncThunk(
  'logs/resetAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await logService.resetAllData(token)
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.logs = action.payload
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(resetAllData.fulfilled, (state) => {
        state.logs = []
      })
  },
})

export const { reset } = logSlice.actions
export default logSlice.reducer
EOL

# logService.js dosyasını oluştur
cat > frontend/src/features/logs/logService.js << 'EOL'
import axiosInstance from '../axios'

const getLogs = async (token, filters = {}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters
  }

  const response = await axiosInstance.get('/logs', config)
  return response.data
}

const resetAllData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axiosInstance.post('/logs/reset', {}, config)
  return response.data
}

const logService = {
  getLogs,
  resetAllData
}

export default logService
EOL

# Frontend build
echo "🏗️ Frontend build yapılıyor..."
cd frontend
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "📦 Dosyalar kopyalanıyor..."
    sudo cp -r dist/* "$DAYACT_DIR/"
    sudo chown -R www-data:www-data "$DAYACT_DIR"
    sudo systemctl restart nginx
    echo "✅ Deployment başarıyla tamamlandı!"
else
    echo "❌ Build başarısız oldu!"
    exit 1
fi 