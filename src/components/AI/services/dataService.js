import { getTokenAnalysis as getDexTokenAnalysis } from './dexService';
import { analyzeChartPatterns, analyzeMarketSentiment } from './gemini';

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getTokenAnalysis = async (contractAddress) => {
    const cacheKey = `analysis-${contractAddress}`;
    if (cache.has(cacheKey)) {
        const { data, timestamp } = cache.get(cacheKey);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
        cache.delete(cacheKey);
    }

    try {
        // Fetch data from DexScreener
        const tokenData = await getDexTokenAnalysis(contractAddress);
        
        // Prepare data for Gemini analysis
        const analysisData = {
            price: tokenData.price,
            market: tokenData.market,
            metadata: tokenData.metadata,
            chart: tokenData.chart
        };

        // Get AI analysis from Gemini
        const [chartAnalysis, sentimentAnalysis] = await Promise.all([
            analyzeChartPatterns(analysisData),
            analyzeMarketSentiment(contractAddress, {
                price_data: tokenData.price,
                market_data: tokenData.market
            })
        ]);

        const result = {
            tokenData: analysisData,
            chartAnalysis,
            sentimentAnalysis,
            timestamp: Date.now()
        };

        // Cache the results
        cache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });

        return result;
    } catch (error) {
        console.error('Analysis Error:', error);
        throw error;
    }
};

// Format large numbers for display
export const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toFixed(2);
};

// Format percentage changes
export const formatPercentage = (num) => {
    if (!num) return '0%';
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

// Validate contract address format
export const isValidContractAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export default {
    getTokenAnalysis,
    formatNumber,
    formatPercentage,
    isValidContractAddress
};