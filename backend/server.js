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
    origin: ['https://yazilimservisi.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/apps/dayact/api/users', require('./routes/userRoutes'));
app.use('/apps/dayact/api/activities', require('./routes/activityRoutes'));
app.use('/apps/dayact/api/logs', require('./routes/logRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`)); 