import { COLLECTIONS, addDocument, getDocument, updateDocument } from '../../utils/db.js';
import { getUserPreferences } from './preferencesService.js';

// Notification types
export const NOTIFICATION_TYPES = {
    PRICE_ALERT: 'price_alert',
    VOLUME_ALERT: 'volume_alert',
    LIQUIDITY_ALERT: 'liquidity_alert',
    PATTERN_ALERT: 'pattern_alert',
    SYSTEM_ALERT: 'system_alert'
};

// Notification priorities
export const PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
};

/**
 * Format notification message based on event type
 */
const formatNotificationMessage = (event) => {
    const messages = {
        EXTREME_PRICE_MOVEMENT: {
            title: '🚨 Extreme Price Movement Detected',
            body: `${event.details.direction === 'up' ? '📈' : '📉'} Price ${event.details.direction} by ${event.details.change.toFixed(2)}%\nCurrent: $${event.details.current_price.toFixed(6)}`
        },
        MAJOR_PRICE_MOVEMENT: {
            title: '⚠️ Major Price Movement',
            body: `${event.details.direction === 'up' ? '📈' : '📉'} Price ${event.details.direction} by ${event.details.change.toFixed(2)}%\nCurrent: $${event.details.current_price.toFixed(6)}`
        },
        EXTREME_VOLUME_SURGE: {
            title: '🚨 Extreme Volume Surge',
            body: `📊 Volume increased ${event.details.ratio.toFixed(1)}x\nCurrent: $${event.details.current_volume.toLocaleString()}`
        },
        MAJOR_VOLUME_SURGE: {
            title: '⚠️ Major Volume Increase',
            body: `📊 Volume increased ${event.details.ratio.toFixed(1)}x\nCurrent: $${event.details.current_volume.toLocaleString()}`
        },
        EXTREME_LIQUIDITY_CHANGE: {
            title: '🚨 Significant Liquidity Change',
            body: `💧 Liquidity ${event.details.direction} by ${event.details.change.toFixed(2)}%\nCurrent: $${event.details.current_liquidity.toLocaleString()}`
        },
        MAJOR_LIQUIDITY_CHANGE: {
            title: '⚠️ Notable Liquidity Change',
            body: `💧 Liquidity ${event.details.direction} by ${event.details.change.toFixed(2)}%\nCurrent: $${event.details.current_liquidity.toLocaleString()}`
        }
    };

    return messages[event.type] || {
        title: 'Market Alert',
        body: 'A significant market event has been detected.'
    };
};

/**
 * Create a notification
 */
const createNotification = async (userId, event, type = NOTIFICATION_TYPES.SYSTEM_ALERT) => {
    try {
        const message = formatNotificationMessage(event);
        const notification = {
            userId,
            type,
            title: message.title,
            body: message.body,
            priority: event.severity === 'HIGH' ? PRIORITIES.HIGH : PRIORITIES.MEDIUM,
            data: event.details,
            read: false,
            created_at: new Date(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        };

        await addDocument(COLLECTIONS.NOTIFICATIONS, notification);
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

/**
 * Send in-app notification
 */
const sendInAppNotification = async (userId, notification) => {
    try {
        // Store in real-time notifications collection for immediate delivery
        await addDocument(COLLECTIONS.REALTIME_NOTIFICATIONS, {
            ...notification,
            delivered: false,
            delivery_attempts: 0
        });
    } catch (error) {
        console.error('Error sending in-app notification:', error);
        throw error;
    }
};

/**
 * Send email notification
 * Note: Implement actual email sending logic (e.g., using SendGrid, AWS SES)
 */
const sendEmailNotification = async (userId, notification) => {
    try {
        // TODO: Implement email sending logic
        console.log('Email notification would be sent:', {
            to: userId,
            subject: notification.title,
            body: notification.body
        });
    } catch (error) {
        console.error('Error sending email notification:', error);
        throw error;
    }
};

/**
 * Send push notification
 * Note: Implement actual push notification logic (e.g., using Firebase Cloud Messaging)
 */
const sendPushNotification = async (userId, notification) => {
    try {
        // TODO: Implement push notification logic
        console.log('Push notification would be sent:', {
            to: userId,
            title: notification.title,
            body: notification.body
        });
    } catch (error) {
        console.error('Error sending push notification:', error);
        throw error;
    }
};

/**
 * Send notification through all enabled channels
 */
export const sendNotification = async (userId, event) => {
    try {
        // Get user preferences
        const preferences = await getUserPreferences(userId);
        const notification = await createNotification(userId, event);

        // Send through enabled channels
        const promises = [];
        
        if (preferences.notification_settings.in_app) {
            promises.push(sendInAppNotification(userId, notification));
        }
        
        if (preferences.notification_settings.email) {
            promises.push(sendEmailNotification(userId, notification));
        }
        
        if (preferences.notification_settings.push) {
            promises.push(sendPushNotification(userId, notification));
        }

        await Promise.all(promises);
        return notification;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};

/**
 * Get user's notifications
 */
export const getUserNotifications = async (userId, options = {}) => {
    try {
        const { limit = 50, unreadOnly = false, type = null } = options;
        
        // Query notifications
        const query = [
            ['userId', '==', userId],
            ['expires_at', '>', new Date()]
        ];

        if (unreadOnly) {
            query.push(['read', '==', false]);
        }

        if (type) {
            query.push(['type', '==', type]);
        }

        const notifications = await getDocument(COLLECTIONS.NOTIFICATIONS, null, {
            where: query,
            orderBy: [['created_at', 'desc']],
            limit
        });

        return notifications || [];
    } catch (error) {
        console.error('Error getting notifications:', error);
        throw error;
    }
};

/**
 * Mark notification as read
 */
export const markNotificationRead = async (notificationId, userId) => {
    try {
        await updateDocument(COLLECTIONS.NOTIFICATIONS, notificationId, {
            read: true,
            updated_at: new Date()
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

export default {
    sendNotification,
    getUserNotifications,
    markNotificationRead,
    NOTIFICATION_TYPES,
    PRIORITIES
};