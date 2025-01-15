import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { rateLimiter } from './api/middleware/rateLimit.js';
import aiRoutes from './api/routes/aiRoutes.js';
import dataRoutes from './api/routes/dataRoutes.js';
import userRoutes from './api/routes/userRoutes.js';
import { config } from './config.js';

// ES module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global rate limiting
app.use(rateLimiter);

// API Routes
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/data', dataRoutes);
app.use('/api/v1/user', userRoutes);

// Basic health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        services: {
            ai: '✅',
            data: '✅',
            user: '✅'
        }
    });
});

// API documentation route
app.get('/api/docs', (req, res) => {
    res.json({
        version: '1.0.0',
        endpoints: {
            ai: {
                'POST /api/v1/ai/analyze/patterns': 'Analyze chart patterns',
                'POST /api/v1/ai/analyze/sentiment': 'Analyze market sentiment',
                'POST /api/v1/ai/analyze/specific': 'Get specific insights',
                'GET /api/v1/ai/personalities': 'Get available AI personalities'
            },
            data: {
                'GET /api/v1/data/token/:address': 'Get token data',
                'GET /api/v1/data/pairs/:address': 'Get trading pairs',
                'POST /api/v1/data/validate': 'Validate token address'
            },
            user: {
                'GET /api/v1/user/preferences': 'Get user preferences',
                'PUT /api/v1/user/preferences': 'Update user preferences',
                'GET /api/v1/user/analysis-params': 'Get analysis parameters',
                'GET /api/v1/user/notifications': 'Get user notifications',
                'PUT /api/v1/user/notifications/:id/read': 'Mark notification as read',
                'PUT /api/v1/user/notifications/settings': 'Update notification settings'
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing authentication token'
        });
    }

    // Default error response
    res.status(500).json({
        error: 'Internal Server Error',
        message: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`CORS origin: ${config.corsOrigin}`);
    console.log('Available services: AI, Data, User');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});