import axios from 'axios';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

const DEX_SCREENER_API = 'https://api.dexscreener.com/latest';
const CACHE_DURATION = 30 * 1000; // 30 seconds

/**
 * Format token data from DexScreener response
 */
const formatTokenData = (data) => {
    const pair = data.pairs?.[0];
    if (!pair) {
        throw new Error('No trading pair found');
    }

    return {
        price: {
            current: parseFloat(pair.priceUsd),
            change_24h: parseFloat(pair.priceChange.h24),
            high_24h: parseFloat(pair.priceUsd) * (1 + Math.abs(pair.priceChange.h24) / 100),
            low_24h: parseFloat(pair.priceUsd) * (1 - Math.abs(pair.priceChange.h24) / 100)
        },
        market: {
            market_cap: parseFloat(pair.fdv),
            volume_24h: parseFloat(pair.volume.h24),
            liquidity_usd: parseFloat(pair.liquidity.usd),
            circulating_supply: parseFloat(pair.fdv) / parseFloat(pair.priceUsd)
        },
        metadata: {
            name: pair.baseToken.name,
            symbol: pair.baseToken.symbol,
            contract: pair.baseToken.address,
            chain: pair.chainId,
            dex: pair.dexId
        },
        chart: {
            timestamps: [], // DexScreener free tier limitation
            prices: [],    // Would need premium API for historical data
            volumes: []
        }
    };
};

/**
 * Simulate historical data for chart
 * Note: This is a temporary solution until we integrate with a data provider that offers historical data
 */
const simulateHistoricalData = (currentPrice, priceChange24h) => {
    const hours = 24;
    const data = {
        timestamps: [],
        prices: [],
        volumes: []
    };

    const now = Date.now();
    const hourMs = 3600000;
    const volatility = Math.abs(priceChange24h) / 100;

    for (let i = 0; i < hours; i++) {
        const timestamp = now - (hours - i) * hourMs;
        const randomChange = (Math.random() - 0.5) * volatility;
        const price = currentPrice * (1 + randomChange);
        const volume = Math.random() * 1000000;

        data.timestamps.push(timestamp);
        data.prices.push(price);
        data.volumes.push(volume);
    }

    return data;
};

/**
 * Fetch token data from DexScreener
 */
export const getTokenData = async (tokenAddress) => {
    try {
        // Check cache
        const cacheKey = `token_${tokenAddress}`;
        const cached = await getDocument(COLLECTIONS.MARKET_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from DexScreener
        const response = await axios.get(`${DEX_SCREENER_API}/tokens/${tokenAddress}`);
        
        if (!response.data || !response.data.pairs || response.data.pairs.length === 0) {
            throw new Error('Token not found or no trading pairs available');
        }

        const formattedData = formatTokenData(response.data);
        
        // Add simulated historical data
        const historicalData = simulateHistoricalData(
            formattedData.price.current,
            formattedData.price.change_24h
        );
        formattedData.chart = historicalData;

        // Cache result
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            data: formattedData,
            timestamp: Date.now()
        }, cacheKey);

        return formattedData;
    } catch (error) {
        console.error('Error fetching token data:', error);
        throw new Error(`Failed to fetch token data: ${error.message}`);
    }
};

/**
 * Get trading pairs for a token
 */
export const getTradingPairs = async (tokenAddress) => {
    try {
        const response = await axios.get(`${DEX_SCREENER_API}/tokens/${tokenAddress}/pairs`);
        
        if (!response.data || !response.data.pairs) {
            throw new Error('No trading pairs found');
        }

        return response.data.pairs.map(pair => ({
            dex: pair.dexId,
            chain: pair.chainId,
            pair_address: pair.pairAddress,
            base_token: {
                address: pair.baseToken.address,
                name: pair.baseToken.name,
                symbol: pair.baseToken.symbol
            },
            quote_token: {
                address: pair.quoteToken.address,
                name: pair.quoteToken.name,
                symbol: pair.quoteToken.symbol
            },
            price_usd: parseFloat(pair.priceUsd),
            liquidity_usd: parseFloat(pair.liquidity.usd),
            volume_24h: parseFloat(pair.volume.h24)
        }));
    } catch (error) {
        console.error('Error fetching trading pairs:', error);
        throw new Error(`Failed to fetch trading pairs: ${error.message}`);
    }
};

export default {
    getTokenData,
    getTradingPairs
};