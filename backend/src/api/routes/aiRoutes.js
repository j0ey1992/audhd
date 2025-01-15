import express from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { rateLimiter } from '../middleware/rateLimit.js';
import {
    analyzePatterns,
    analyzeSentiment,
    getInsights,
    getPersonalities
} from '../controllers/aiController.js';

const router = express.Router();

// Get available personalities (public endpoint)
router.get('/personalities', optionalAuth, rateLimiter, getPersonalities);

// Protected analysis endpoints
router.post('/analyze/patterns', authenticate, rateLimiter, analyzePatterns);
router.post('/analyze/sentiment', authenticate, rateLimiter, analyzeSentiment);
router.post('/analyze/specific', authenticate, rateLimiter, getInsights);

export default router;