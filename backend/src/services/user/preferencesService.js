import { COLLECTIONS, addDocument, getDocument, updateDocument } from '../../utils/db.js';

// Default user preferences
const DEFAULT_PREFERENCES = {
    risk_tolerance: 'medium',
    preferred_analysis_types: ['technical', 'sentiment'],
    notification_settings: {
        email: true,
        push: true,
        in_app: true
    },
    personality: 'AUTISM',
    chart_preferences: {
        timeframe: '24h',
        indicators: ['RSI', 'MACD', 'MA'],
        display_mode: 'detailed'
    },
    focus_areas: {
        price_action: true,
        volume_analysis: true,
        holder_analysis: true,
        social_sentiment: true
    },
    created_at: new Date(),
    updated_at: new Date()
};

/**
 * Get user preferences
 */
export const getUserPreferences = async (userId) => {
    try {
        const preferences = await getDocument(COLLECTIONS.USER_PREFERENCES, userId);
        
        if (!preferences) {
            // Create default preferences for new user
            const defaultPrefs = { ...DEFAULT_PREFERENCES };
            await addDocument(COLLECTIONS.USER_PREFERENCES, defaultPrefs, userId);
            return defaultPrefs;
        }

        return preferences;
    } catch (error) {
        console.error('Error getting user preferences:', error);
        throw new Error(`Failed to get user preferences: ${error.message}`);
    }
};

/**
 * Update user preferences
 */
export const updateUserPreferences = async (userId, updates) => {
    try {
        const currentPrefs = await getUserPreferences(userId);
        
        // Validate risk tolerance
        if (updates.risk_tolerance && !['low', 'medium', 'high'].includes(updates.risk_tolerance)) {
            throw new Error('Invalid risk tolerance level');
        }

        // Validate analysis types
        if (updates.preferred_analysis_types) {
            const validTypes = ['technical', 'sentiment', 'risk', 'social'];
            const invalidTypes = updates.preferred_analysis_types.filter(type => !validTypes.includes(type));
            if (invalidTypes.length > 0) {
                throw new Error(`Invalid analysis types: ${invalidTypes.join(', ')}`);
            }
        }

        // Validate personality
        if (updates.personality && !['AUTISM', 'ADHD', 'AUDHD'].includes(updates.personality)) {
            throw new Error('Invalid personality type');
        }

        const updatedPrefs = {
            ...currentPrefs,
            ...updates,
            updated_at: new Date()
        };

        await updateDocument(COLLECTIONS.USER_PREFERENCES, userId, updatedPrefs);
        return updatedPrefs;
    } catch (error) {
        console.error('Error updating user preferences:', error);
        throw new Error(`Failed to update user preferences: ${error.message}`);
    }
};

/**
 * Get analysis parameters based on user preferences
 */
export const getAnalysisParameters = async (userId) => {
    try {
        const preferences = await getUserPreferences(userId);
        
        return {
            risk_level: preferences.risk_tolerance,
            analysis_types: preferences.preferred_analysis_types,
            personality: preferences.personality,
            indicators: preferences.chart_preferences.indicators,
            focus_areas: Object.entries(preferences.focus_areas)
                .filter(([_, enabled]) => enabled)
                .map(([area]) => area)
        };
    } catch (error) {
        console.error('Error getting analysis parameters:', error);
        throw new Error(`Failed to get analysis parameters: ${error.message}`);
    }
};

/**
 * Update user notification settings
 */
export const updateNotificationSettings = async (userId, settings) => {
    try {
        const updates = {
            notification_settings: {
                email: Boolean(settings.email),
                push: Boolean(settings.push),
                in_app: Boolean(settings.in_app)
            }
        };

        return await updateUserPreferences(userId, updates);
    } catch (error) {
        console.error('Error updating notification settings:', error);
        throw new Error(`Failed to update notification settings: ${error.message}`);
    }
};

/**
 * Get user's analysis history
 */
export const getAnalysisHistory = async (userId, limit = 10) => {
    try {
        const history = await getDocument(COLLECTIONS.ANALYSIS_HISTORY, userId);
        
        if (!history) {
            return [];
        }

        // Sort by timestamp descending and limit results
        return history.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
    } catch (error) {
        console.error('Error getting analysis history:', error);
        throw new Error(`Failed to get analysis history: ${error.message}`);
    }
};

export default {
    getUserPreferences,
    updateUserPreferences,
    getAnalysisParameters,
    updateNotificationSettings,
    getAnalysisHistory
};