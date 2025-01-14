import { getTokenAnalysis as getDexTokenAnalysis } from './dexService';
import { analyzeChartPatterns, analyzeMarketSentiment, getSpecificInsights } from './gemini';

// Cache implementation with shorter duration and proper cleanup
const cache = new Map();
const CACHE_DURATION = 30 * 1000; // 30 seconds cache duration

// Clean expired cache entries
const cleanCache = () => {
    const now = Date.now();
    for (const [key, { timestamp }] of cache.entries()) {
        if (now - timestamp > CACHE_DURATION) {
            cache.delete(key);
        }
    }
};

// Function to analyze user questions
export const analyzeUserQuestion = async (question, data) => {
    try {
        // Determine the type of analysis needed
        const questionLower = question.toLowerCase();
        let analysisType = 'general';
        
        if (questionLower.includes('price')) {
            analysisType = 'price';
        } else if (questionLower.includes('volume')) {
            analysisType = 'volume';
        } else if (questionLower.includes('liquidity')) {
            analysisType = 'liquidity';
        } else if (questionLower.includes('pattern')) {
            analysisType = 'pattern';
        }

        // Get AI analysis based on the question type
        const aiResponse = await getSpecificInsights(analysisType, {
            question: question,
            price_data: data.price,
            market_data: data.market,
            metadata: data.metadata,
            chart_data: data.chart
        });

        return aiResponse;
    } catch (error) {
        console.error('Question Analysis Error:', error);
        throw new Error('Failed to analyze question');
    }
};

export const getTokenAnalysis = async (contractAddress) => {
    cleanCache(); // Clean expired entries first

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
        
        // Get AI analysis from Gemini
        const [chartAnalysis, sentimentAnalysis] = await Promise.all([
            analyzeChartPatterns({
                price: tokenData.tokenData.price,
                market: tokenData.tokenData.market,
                metadata: tokenData.tokenData.metadata,
                chart: tokenData.tokenData.chart
            }),
            analyzeMarketSentiment(contractAddress, {
                price_data: tokenData.tokenData.price,
                market_data: tokenData.tokenData.market
            })
        ]);

        const result = {
            tokenData: tokenData.tokenData,
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
    analyzeUserQuestion,
    formatNumber,
    formatPercentage,
    isValidContractAddress
};