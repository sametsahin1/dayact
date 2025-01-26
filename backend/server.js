const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Environment variables
dotenv.config();

// MongoDB bağlantısını yönet
const startServer = async () => {
    try {
        await connectDB();
        
        const app = express();

        // Request logger middleware
        app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
            next();
        });

        // CORS ayarlarını güncelle
        app.use(cors({
            origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }));

        // Body parser middleware
        app.use(express.json({ limit: '10mb' }));
        app.use(express.urlencoded({ extended: false }));

        // Routes
        app.use('/users', require('./routes/userRoutes'));
        app.use('/activities', require('./routes/activityRoutes'));
        app.use('/logs', require('./routes/logRoutes'));

        // Health check endpoint
        app.get('/test', (req, res) => {
            res.json({ status: 'ok' });
        });

        // Error handler
        app.use((err, req, res, next) => {
            console.error('Error:', err);
            res.status(500).json({ message: 'Server Error', error: err.message });
        });

        const PORT = process.env.PORT || 5001;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 