const BASE_URL = 'https://api.coingecko.com/api/v3';

// Cache implementation to respect rate limits
const cache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

// Helper to handle API rate limits and caching
const fetchWithCache = async (url) => {
    if (cache.has(url)) {
        const { data, timestamp } = cache.get(url);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
        cache.delete(url);
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        cache.set(url, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error('CoinGecko API Error:', error);
        throw error;
    }
};

// API Methods
export const coingeckoAPI = {
    // Get coin market data
    getMarketData: async (coinId) => {
        const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=hourly`;
        return fetchWithCache(url);
    },

    // Get current price and market info
    getCoinInfo: async (coinId) => {
        const url = `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`;
        return fetchWithCache(url);
    },

    // Get trending coins
    getTrendingCoins: async () => {
        const url = `${BASE_URL}/search/trending`;
        return fetchWithCache(url);
    },

    // Get global market data
    getGlobalData: async () => {
        const url = `${BASE_URL}/global`;
        return fetchWithCache(url);
    },

    // Search for coins
    searchCoins: async (query) => {
        const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
        return fetchWithCache(url);
    },

    // Get historical OHLC data
    getOHLCData: async (coinId, days = 30) => {
        const url = `${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;
        return fetchWithCache(url);
    },

    // Get coin list with market data
    getCoinsList: async (page = 1, perPage = 100) => {
        const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`;
        return fetchWithCache(url);
    }
};

// Data processing utilities
export const processMarketData = (data) => {
    if (!data || !data.prices) return null;

    return {
        prices: data.prices.map(([timestamp, price]) => ({
            time: timestamp,
            value: price
        })),
        volumes: data.total_volumes.map(([timestamp, volume]) => ({
            time: timestamp,
            value: volume
        })),
        marketCaps: data.market_caps.map(([timestamp, marketCap]) => ({
            time: timestamp,
            value: marketCap
        }))
    };
};

// Technical analysis utilities
export const calculateIndicators = (prices) => {
    if (!prices || prices.length === 0) return null;

    // Simple Moving Average (SMA)
    const sma = (period) => {
        const smaValues = [];
        for (let i = period - 1; i < prices.length; i++) {
            const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b.value, 0);
            smaValues.push({
                time: prices[i].time,
                value: sum / period
            });
        }
        return smaValues;
    };

    // Relative Strength Index (RSI)
    const calculateRSI = (period = 14) => {
        const rsiValues = [];
        let gains = 0;
        let losses = 0;

        // Calculate initial average gain/loss
        for (let i = 1; i < period; i++) {
            const difference = prices[i].value - prices[i - 1].value;
            if (difference >= 0) {
                gains += difference;
            } else {
                losses -= difference;
            }
        }

        let avgGain = gains / period;
        let avgLoss = losses / period;

        // Calculate RSI for remaining periods
        for (let i = period; i < prices.length; i++) {
            const difference = prices[i].value - prices[i - 1].value;
            
            avgGain = ((avgGain * (period - 1)) + (difference >= 0 ? difference : 0)) / period;
            avgLoss = ((avgLoss * (period - 1)) + (difference < 0 ? -difference : 0)) / period;

            const rs = avgGain / avgLoss;
            rsiValues.push({
                time: prices[i].time,
                value: 100 - (100 / (1 + rs))
            });
        }

        return rsiValues;
    };

    return {
        sma20: sma(20),
        sma50: sma(50),
        rsi: calculateRSI(14)
    };
};

export default coingeckoAPI;