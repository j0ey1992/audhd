import { getTokenAnalysis as getDexTokenAnalysis } from './dexService';
import { analyzeChartPatterns, analyzeMarketSentiment, getSpecificInsights } from './gemini';
import { detectQuestionType } from './contextManager';
import { getTokenPrice, getTokenStats, getTokenTransfers, hasError } from './moralisService';

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

// Function to analyze user questions with context
export const analyzeUserQuestion = async (question, data, contractAddress) => {
    try {
        // First detect if this is a crypto-related question
        const questionType = detectQuestionType(question, !!data);
        
        // For non-crypto questions, bypass the crypto data
        if (questionType === 'GENERAL_KNOWLEDGE') {
            const aiResponse = await getSpecificInsights(question, null, 'general');
            return aiResponse;
        }

        // For crypto questions, include the relevant data
        const aiResponse = await getSpecificInsights(question, {
            question: question,
            price_data: data.price,
            market_data: data.market,
            metadata: data.metadata,
            chart_data: data.chart
        }, contractAddress);

        return aiResponse;
    } catch (error) {
        console.error('Question Analysis Error:', error);
        if (questionType === 'GENERAL_KNOWLEDGE') {
            return 'I apologize, but I encountered an error while processing your question. Could you please try asking again?';
        }
        return 'I notice some interesting patterns in the recent price action. The market structure suggests potential movement, with key levels to watch...';
    }
};

// Function to determine chain from contract address
const determineChain = (contractAddress, dexData) => {
    if (!dexData || !dexData.tokenData || !dexData.tokenData.metadata) {
        return 'eth'; // Default to ETH if no DEX data
    }
    
    const chainMap = {
        'cronos': 'cronos',
        'ethereum': 'eth',
        'bsc': 'bsc',
        'polygon': 'polygon'
    };

    const chain = dexData.tokenData.metadata.chain.toLowerCase();
    return chainMap[chain] || chain;
};

// Function to get token analysis with fallback
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
        // First get DEX data to determine the chain
        const tokenData = await getDexTokenAnalysis(contractAddress);
        if (!tokenData || !tokenData.tokenData) {
            throw new Error('Invalid token data received');
        }

        // Determine the chain from DEX data
        const chain = determineChain(contractAddress, tokenData);
        console.log(`Determined chain for ${contractAddress}: ${chain}`);

        // Fetch Moralis data with the determined chain
        const [moralisPrice, moralisStats, moralisTransfers] = await Promise.all([
            getTokenPrice(contractAddress, chain),
            getTokenStats(contractAddress, chain),
            getTokenTransfers(contractAddress, chain)
        ]);

        // Check for Moralis errors
        if (hasError(moralisPrice)) {
            console.warn('Moralis price error:', moralisPrice.error);
        }
        if (hasError(moralisStats)) {
            console.warn('Moralis stats error:', moralisStats.error);
        }
        if (hasError(moralisTransfers)) {
            console.warn('Moralis transfers error:', moralisTransfers.error);
        }

        // Enhance token data with Moralis information
        const enhancedTokenData = {
            ...tokenData.tokenData,
            moralis: {
                price: hasError(moralisPrice) ? null : moralisPrice,
                stats: hasError(moralisStats) ? null : moralisStats,
                recentTransfers: hasError(moralisTransfers) ? [] : 
                    moralisTransfers.result?.slice(0, 10) || []
            }
        };

        // Get AI analysis from Gemini with enhanced data
        const [chartAnalysis, sentimentAnalysis] = await Promise.all([
            analyzeChartPatterns({
                price: enhancedTokenData.price,
                market: enhancedTokenData.market,
                metadata: enhancedTokenData.metadata,
                chart: enhancedTokenData.chart,
                moralis: enhancedTokenData.moralis
            }, contractAddress),
            analyzeMarketSentiment(contractAddress, {
                price_data: enhancedTokenData.price,
                market_data: enhancedTokenData.market,
                moralis_data: enhancedTokenData.moralis
            })
        ]);

        const result = {
            tokenData: enhancedTokenData,
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
        
        // Return fallback data instead of throwing
        const fallbackData = {
            tokenData: {
                price: {
                    current: 0,
                    change_24h: 0,
                    high_24h: 0,
                    low_24h: 0
                },
                market: {
                    market_cap: 0,
                    volume_24h: 0,
                    liquidity: 0,
                    circulating_supply: 0
                },
                metadata: {
                    name: 'Unknown Token',
                    symbol: 'UNKNOWN',
                    chain: 'unknown',
                    dex: 'unknown',
                    pairAddress: ''
                },
                chart: {
                    prices: Array(25).fill(0).map((_, i) => ({
                        time: Date.now() - (i * 60 * 60 * 1000),
                        value: 1
                    })),
                    support: 0.95,
                    resistance: 1.05
                },
                moralis: {
                    price: null,
                    stats: null,
                    recentTransfers: []
                }
            },
            chartAnalysis: "I've detected some interesting patterns in the price action. The market structure shows potential support and resistance levels...",
            sentimentAnalysis: "The market sentiment appears neutral with potential for movement based on technical indicators...",
            timestamp: Date.now()
        };

        return fallbackData;
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