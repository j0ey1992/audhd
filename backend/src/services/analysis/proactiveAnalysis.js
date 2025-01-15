import { getTokenData } from '../data/dexService.js';
import { analyzeChartPatterns, analyzeMarketSentiment } from '../ai/geminiService.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

// Threshold configurations for different events
const THRESHOLDS = {
    PRICE_CHANGE: {
        SIGNIFICANT: 0.05,  // 5%
        MAJOR: 0.10,       // 10%
        EXTREME: 0.20      // 20%
    },
    VOLUME_CHANGE: {
        SIGNIFICANT: 2,    // 2x normal
        MAJOR: 5,         // 5x normal
        EXTREME: 10       // 10x normal
    },
    LIQUIDITY_CHANGE: {
        SIGNIFICANT: 0.20, // 20%
        MAJOR: 0.35,      // 35%
        EXTREME: 0.50     // 50%
    }
};

/**
 * Check if an event was recently triggered to avoid spam
 */
const wasRecentlyTriggered = async (tokenAddress, eventType) => {
    try {
        const cacheKey = `event_${tokenAddress}_${eventType}`;
        const cached = await getDocument(COLLECTIONS.MARKET_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < 3600000) { // 1 hour cooldown
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error checking recent triggers:', error);
        return false;
    }
};

/**
 * Record an event trigger
 */
const recordEventTrigger = async (tokenAddress, eventType, eventData) => {
    try {
        const cacheKey = `event_${tokenAddress}_${eventType}`;
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            timestamp: Date.now(),
            data: eventData
        }, cacheKey);
    } catch (error) {
        console.error('Error recording event trigger:', error);
    }
};

/**
 * Analyze price movements
 */
const analyzePriceMovements = async (tokenData, previousData) => {
    const events = [];
    const priceChange = Math.abs((tokenData.price.current - previousData.price.current) / previousData.price.current);

    if (priceChange >= THRESHOLDS.PRICE_CHANGE.EXTREME) {
        events.push({
            type: 'EXTREME_PRICE_MOVEMENT',
            severity: 'HIGH',
            details: {
                change: priceChange * 100,
                direction: tokenData.price.current > previousData.price.current ? 'up' : 'down',
                current_price: tokenData.price.current,
                previous_price: previousData.price.current
            }
        });
    } else if (priceChange >= THRESHOLDS.PRICE_CHANGE.MAJOR) {
        events.push({
            type: 'MAJOR_PRICE_MOVEMENT',
            severity: 'MEDIUM',
            details: {
                change: priceChange * 100,
                direction: tokenData.price.current > previousData.price.current ? 'up' : 'down',
                current_price: tokenData.price.current,
                previous_price: previousData.price.current
            }
        });
    }

    return events;
};

/**
 * Analyze volume changes
 */
const analyzeVolumeChanges = async (tokenData, previousData) => {
    const events = [];
    const volumeRatio = tokenData.market.volume_24h / previousData.market.volume_24h;

    if (volumeRatio >= THRESHOLDS.VOLUME_CHANGE.EXTREME) {
        events.push({
            type: 'EXTREME_VOLUME_SURGE',
            severity: 'HIGH',
            details: {
                ratio: volumeRatio,
                current_volume: tokenData.market.volume_24h,
                previous_volume: previousData.market.volume_24h
            }
        });
    } else if (volumeRatio >= THRESHOLDS.VOLUME_CHANGE.MAJOR) {
        events.push({
            type: 'MAJOR_VOLUME_SURGE',
            severity: 'MEDIUM',
            details: {
                ratio: volumeRatio,
                current_volume: tokenData.market.volume_24h,
                previous_volume: previousData.market.volume_24h
            }
        });
    }

    return events;
};

/**
 * Analyze liquidity changes
 */
const analyzeLiquidityChanges = async (tokenData, previousData) => {
    const events = [];
    const liquidityChange = Math.abs((tokenData.market.liquidity_usd - previousData.market.liquidity_usd) / previousData.market.liquidity_usd);

    if (liquidityChange >= THRESHOLDS.LIQUIDITY_CHANGE.EXTREME) {
        events.push({
            type: 'EXTREME_LIQUIDITY_CHANGE',
            severity: 'HIGH',
            details: {
                change: liquidityChange * 100,
                direction: tokenData.market.liquidity_usd > previousData.market.liquidity_usd ? 'increase' : 'decrease',
                current_liquidity: tokenData.market.liquidity_usd,
                previous_liquidity: previousData.market.liquidity_usd
            }
        });
    } else if (liquidityChange >= THRESHOLDS.LIQUIDITY_CHANGE.MAJOR) {
        events.push({
            type: 'MAJOR_LIQUIDITY_CHANGE',
            severity: 'MEDIUM',
            details: {
                change: liquidityChange * 100,
                direction: tokenData.market.liquidity_usd > previousData.market.liquidity_usd ? 'increase' : 'decrease',
                current_liquidity: tokenData.market.liquidity_usd,
                previous_liquidity: previousData.market.liquidity_usd
            }
        });
    }

    return events;
};

/**
 * Analyze token for significant events
 */
export const analyzeToken = async (tokenAddress) => {
    try {
        // Get current token data
        const currentData = await getTokenData(tokenAddress);
        
        // Get previous data from cache
        const cacheKey = `previous_${tokenAddress}`;
        const previousData = await getDocument(COLLECTIONS.MARKET_DATA_CACHE, cacheKey);

        if (!previousData) {
            // Store initial data and return
            await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
                data: currentData,
                timestamp: Date.now()
            }, cacheKey);
            return [];
        }

        // Analyze different aspects
        const events = [
            ...(await analyzePriceMovements(currentData, previousData.data)),
            ...(await analyzeVolumeChanges(currentData, previousData.data)),
            ...(await analyzeLiquidityChanges(currentData, previousData.data))
        ];

        // For significant events, get AI analysis
        const significantEvents = events.filter(event => event.severity === 'HIGH');
        if (significantEvents.length > 0) {
            const aiAnalysis = await Promise.all([
                analyzeChartPatterns(currentData, tokenAddress),
                analyzeMarketSentiment(currentData, tokenAddress)
            ]);

            events.push({
                type: 'AI_ANALYSIS',
                severity: 'INFO',
                details: {
                    patterns: aiAnalysis[0],
                    sentiment: aiAnalysis[1]
                }
            });
        }

        // Update previous data cache
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            data: currentData,
            timestamp: Date.now()
        }, cacheKey);

        return events;
    } catch (error) {
        console.error('Error in proactive analysis:', error);
        throw new Error(`Failed to analyze token: ${error.message}`);
    }
};

/**
 * Start monitoring a token
 */
export const startMonitoring = async (tokenAddress, userId) => {
    try {
        const monitoringKey = `monitoring_${tokenAddress}_${userId}`;
        
        // Check if already monitoring
        const existing = await getDocument(COLLECTIONS.MARKET_DATA_CACHE, monitoringKey);
        if (existing) {
            return { message: 'Already monitoring this token' };
        }

        // Store monitoring status
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            userId,
            tokenAddress,
            startedAt: Date.now(),
            status: 'active'
        }, monitoringKey);

        return { message: 'Started monitoring token' };
    } catch (error) {
        console.error('Error starting monitoring:', error);
        throw new Error(`Failed to start monitoring: ${error.message}`);
    }
};

/**
 * Stop monitoring a token
 */
export const stopMonitoring = async (tokenAddress, userId) => {
    try {
        const monitoringKey = `monitoring_${tokenAddress}_${userId}`;
        
        // Update monitoring status
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            userId,
            tokenAddress,
            stoppedAt: Date.now(),
            status: 'inactive'
        }, monitoringKey);

        return { message: 'Stopped monitoring token' };
    } catch (error) {
        console.error('Error stopping monitoring:', error);
        throw new Error(`Failed to stop monitoring: ${error.message}`);
    }
};

export default {
    analyzeToken,
    startMonitoring,
    stopMonitoring
};