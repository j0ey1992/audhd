// Temporary in-memory store for development
const store = new Map();

export const COLLECTIONS = {
    ANALYSIS_HISTORY: 'analysis_history',
    NOTIFICATIONS: 'notifications',
    REALTIME_NOTIFICATIONS: 'realtime_notifications',
    USER_PREFERENCES: 'user_preferences'
};

export const addDocument = async (collection, data, id = null) => {
    const key = `${collection}_${id || Date.now()}`;
    store.set(key, { ...data, id: key });
    return key;
};

export const getDocument = async (collection, id = null, options = {}) => {
    if (id) {
        const key = `${collection}_${id}`;
        return store.get(key) || null;
    }
    
    // Simple filtering for development
    const results = [];
    for (const [key, value] of store.entries()) {
        if (key.startsWith(`${collection}_`)) {
            results.push(value);
        }
    }
    return results;
};

export const updateDocument = async (collection, id, data) => {
    const key = `${collection}_${id}`;
    const existing = store.get(key);
    if (existing) {
        store.set(key, { ...existing, ...data });
        return true;
    }
    return false;
};

export default {
    addDocument,
    getDocument,
    updateDocument,
    COLLECTIONS
};