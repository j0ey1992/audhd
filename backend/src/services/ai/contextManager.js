import { COLLECTIONS, addDocument, getDocument, updateDocument } from '../../utils/db.js';

// Maximum conversation history length
const MAX_HISTORY_LENGTH = 10;

// Context retention time (30 minutes)
const CONTEXT_RETENTION_TIME = 30 * 60 * 1000;

/**
 * Format message for context
 */
const formatMessage = (role, content) => ({
    role,
    content,
    timestamp: Date.now()
});

/**
 * Clean old messages from history
 */
const cleanHistory = (history) => {
    const now = Date.now();
    return history
        .filter(msg => (now - msg.timestamp) < CONTEXT_RETENTION_TIME)
        .slice(-MAX_HISTORY_LENGTH);
};

/**
 * Get conversation context
 */
export const getContext = async (userId, tokenAddress) => {
    try {
        const contextKey = `context_${userId}_${tokenAddress}`;
        const context = await getDocument(COLLECTIONS.ANALYSIS_HISTORY, contextKey);

        if (!context) {
            return {
                history: [],
                metadata: {
                    tokenAddress,
                    created_at: Date.now(),
                    updated_at: Date.now()
                }
            };
        }

        // Clean old messages
        context.history = cleanHistory(context.history);
        return context;
    } catch (error) {
        console.error('Error getting context:', error);
        throw error;
    }
};

/**
 * Add message to context
 */
export const addToContext = async (userId, tokenAddress, role, content) => {
    try {
        const contextKey = `context_${userId}_${tokenAddress}`;
        const context = await getContext(userId, tokenAddress);

        // Add new message
        const updatedHistory = [
            ...context.history,
            formatMessage(role, content)
        ];

        // Update context
        const updatedContext = {
            history: cleanHistory(updatedHistory),
            metadata: {
                ...context.metadata,
                updated_at: Date.now()
            }
        };

        await addDocument(COLLECTIONS.ANALYSIS_HISTORY, updatedContext, contextKey);
        return updatedContext;
    } catch (error) {
        console.error('Error adding to context:', error);
        throw error;
    }
};

/**
 * Clear conversation context
 */
export const clearContext = async (userId, tokenAddress) => {
    try {
        const contextKey = `context_${userId}_${tokenAddress}`;
        const emptyContext = {
            history: [],
            metadata: {
                tokenAddress,
                created_at: Date.now(),
                updated_at: Date.now()
            }
        };

        await addDocument(COLLECTIONS.ANALYSIS_HISTORY, emptyContext, contextKey);
        return emptyContext;
    } catch (error) {
        console.error('Error clearing context:', error);
        throw error;
    }
};

/**
 * Format context for AI prompt
 */
export const formatContextForPrompt = (context) => {
    if (!context.history.length) {
        return '';
    }

    return context.history
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n');
};

/**
 * Get relevant context snippets
 */
export const getRelevantContext = async (userId, tokenAddress, query) => {
    try {
        const context = await getContext(userId, tokenAddress);
        
        // If no history, return empty context
        if (!context.history.length) {
            return '';
        }

        // Simple relevance scoring based on content similarity
        // TODO: Implement more sophisticated relevance scoring
        const relevantMessages = context.history
            .filter(msg => {
                const queryWords = query.toLowerCase().split(' ');
                const messageWords = msg.content.toLowerCase().split(' ');
                return queryWords.some(word => messageWords.includes(word));
            })
            .slice(-3); // Get last 3 relevant messages

        return relevantMessages
            .map(msg => `${msg.role}: ${msg.content}`)
            .join('\n\n');
    } catch (error) {
        console.error('Error getting relevant context:', error);
        throw error;
    }
};

export default {
    getContext,
    addToContext,
    clearContext,
    formatContextForPrompt,
    getRelevantContext
};