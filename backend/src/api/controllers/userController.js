import {
    getUserPreferences,
    updateUserPreferences,
    getAnalysisParameters
} from '../../services/user/preferencesService.js';
import {
    getUserNotifications,
    markNotificationRead,
    NOTIFICATION_TYPES
} from '../../services/user/notificationService.js';

/**
 * Get user preferences
 * @route GET /api/v1/user/preferences
 */
export const getPreferences = async (req, res) => {
    try {
        const preferences = await getUserPreferences(req.user.uid);
        
        res.json({
            success: true,
            data: preferences
        });
    } catch (error) {
        console.error('Error getting preferences:', error);
        res.status(500).json({
            error: 'Preferences Error',
            message: error.message
        });
    }
};

/**
 * Update user preferences
 * @route PUT /api/v1/user/preferences
 */
export const updatePreferences = async (req, res) => {
    try {
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'No preference updates provided'
            });
        }

        const updatedPreferences = await updateUserPreferences(req.user.uid, updates);
        
        res.json({
            success: true,
            data: updatedPreferences
        });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({
            error: 'Preferences Error',
            message: error.message
        });
    }
};

/**
 * Get analysis parameters
 * @route GET /api/v1/user/analysis-params
 */
export const getParameters = async (req, res) => {
    try {
        const parameters = await getAnalysisParameters(req.user.uid);
        
        res.json({
            success: true,
            data: parameters
        });
    } catch (error) {
        console.error('Error getting analysis parameters:', error);
        res.status(500).json({
            error: 'Parameters Error',
            message: error.message
        });
    }
};

/**
 * Get user notifications
 * @route GET /api/v1/user/notifications
 */
export const getNotifications = async (req, res) => {
    try {
        const { limit, unreadOnly, type } = req.query;
        
        const options = {
            limit: parseInt(limit) || 50,
            unreadOnly: unreadOnly === 'true',
            type: type && NOTIFICATION_TYPES[type.toUpperCase()] ? type : null
        };

        const notifications = await getUserNotifications(req.user.uid, options);
        
        res.json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).json({
            error: 'Notifications Error',
            message: error.message
        });
    }
};

/**
 * Mark notification as read
 * @route PUT /api/v1/user/notifications/:id/read
 */
export const markRead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Notification ID is required'
            });
        }

        await markNotificationRead(id, req.user.uid);
        
        res.json({
            success: true,
            message: 'Notification marked as read'
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({
            error: 'Notification Error',
            message: error.message
        });
    }
};

/**
 * Update notification settings
 * @route PUT /api/v1/user/notifications/settings
 */
export const updateNotificationSettings = async (req, res) => {
    try {
        const { email, push, in_app } = req.body;

        if (typeof email !== 'boolean' || typeof push !== 'boolean' || typeof in_app !== 'boolean') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Invalid notification settings'
            });
        }

        const updates = {
            notification_settings: { email, push, in_app }
        };

        const updatedPreferences = await updateUserPreferences(req.user.uid, updates);
        
        res.json({
            success: true,
            data: updatedPreferences.notification_settings
        });
    } catch (error) {
        console.error('Error updating notification settings:', error);
        res.status(500).json({
            error: 'Settings Error',
            message: error.message
        });
    }
};

export default {
    getPreferences,
    updatePreferences,
    getParameters,
    getNotifications,
    markRead,
    updateNotificationSettings
};