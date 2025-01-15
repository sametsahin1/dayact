const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS ayarları
app.use(cors({
    origin: ['http://yazilimservisi.com:8080', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Base path tanımı
const BASE_PATH = '/api';

// Routes
app.use(`${BASE_PATH}/users`, require('./routes/userRoutes'));
app.use(`${BASE_PATH}/activities`, require('./routes/activityRoutes'));
app.use(`${BASE_PATH}/logs`, require('./routes/logRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 