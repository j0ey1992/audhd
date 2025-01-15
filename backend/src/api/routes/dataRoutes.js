import express from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { rateLimiter } from '../middleware/rateLimit.js';
import {
    getToken,
    getPairs,
    validateAddress
} from '../controllers/dataController.js';

const router = express.Router();

// Public endpoints with rate limiting and optional auth
router.get('/token/:address', optionalAuth, rateLimiter, getToken);
router.get('/pairs/:address', optionalAuth, rateLimiter, getPairs);
router.post('/validate', optionalAuth, rateLimiter, validateAddress);

export default router;