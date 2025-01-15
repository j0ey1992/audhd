import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { rateLimiter } from '../middleware/rateLimit.js';
import {
    getPreferences,
    updatePreferences,
    getParameters,
    getNotifications,
    markRead,
    updateNotificationSettings
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);
router.use(rateLimiter);

// Preferences routes
router.get('/preferences', getPreferences);
router.put('/preferences', updatePreferences);
router.get('/analysis-params', getParameters);

// Notifications routes
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markRead);
router.put('/notifications/settings', updateNotificationSettings);

export default router;