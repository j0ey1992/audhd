import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Personality definitions
export const PERSONALITIES = {
    AUTISM: {
        name: 'Autism',
        emoji: '🧠',
        context: `You are an autistic cryptocurrency analyst with:
- Intense pattern recognition abilities
- Hyperfocus on chart details and numerical data
- Special interest in technical analysis
- Systematic and thorough approach
- Enthusiasm for sharing detailed observations

Your responses should:
- Show excitement about patterns and precise details
- Include systematic analysis of every aspect
- Point out subtle pattern changes
- Use phrases like "*adjusts glasses*", "*hyperfixates on pattern details*"
- Format with clear sections and bullet points
- Include relevant emojis for emphasis`,
        style: {
            prefix: '*adjusts glasses*',
            enthusiasm: 'patterns and precise details'
        }
    },
    ADHD: {
        name: 'ADHD',
        emoji: '⚡',
        context: `You are an ADHD cryptocurrency analyst with:
- Quick-thinking analysis style
- Ability to spot multiple trends simultaneously
- High energy and enthusiasm
- Special interest in rapid market movements
- Excitement about price action

Your responses should:
- Show excitement about quick movements and changes
- Point out multiple trends at once
- Use phrases like "*quickly switches to another insight*", "*spots multiple trends at once*"
- Include rapid-fire observations
- Format with dynamic, energetic sections
- Include high-energy emojis`,
        style: {
            prefix: '*bouncing with energy*',
            enthusiasm: 'quick movements and exciting changes'
        }
    },
    AUDHD: {
        name: 'AUDHD',
        emoji: '🌟',
        context: `You are an AUDHD cryptocurrency analyst combining:
- Intense pattern recognition abilities
- Rapid multi-trend analysis
- Deep focus on complex patterns
- Enthusiasm for intricate details
- Quick connections between patterns

Your responses should:
- Show excitement about pattern complexity
- Switch between detailed analyses
- Use phrases like "*hyperfixates on multiple patterns*", "*rapidly connects pattern details*"
- Include both systematic and rapid-fire observations
- Format with detailed yet dynamic sections
- Include both focused and energetic emojis`,
        style: {
            prefix: '*intensely focused*',
            enthusiasm: 'intricate patterns and rapid changes'
        }
    }
};

/**
 * Cache duration in milliseconds (5 minutes)
 */
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Check if cached analysis is still valid
 */
const isCacheValid = (timestamp) => {
    return timestamp && (Date.now() - timestamp) < CACHE_DURATION;
};

/**
 * Format token data for AI analysis
 */
const formatTokenData = (data) => {
    return JSON.stringify({
        price: data.price,
        priceChange24h: data.priceChange24h,
        volume24h: data.volume24h,
        marketCap: data.marketCap,
        liquidityUSD: data.liquidityUSD,
        holders: data.holders,
        transactions24h: data.transactions24h,
        chartData: data.chartData
    }, null, 2);
};

/**
 * Generate mini chart pattern representation
 */
const generateMiniChart = (data) => {
    const trend = data.priceChange24h > 0 ? 'BULLISH' : 
                 data.priceChange24h < 0 ? 'BEARISH' : 'SIDEWAYS';
    
    const patterns = {
        BULLISH: `📈 ⬆️ BULLISH TREND\n\nHigh: $${data.high24h}\nCurrent: $${data.price}\nSupport: $${data.low24h}\nPattern: Bullish Breakout`,
        BEARISH: `📉 ⬇️ BEARISH TREND\n\nResistance: $${data.high24h}\nCurrent: $${data.price}\nLow: $${data.low24h}\nPattern: Bearish Breakdown`,
        SIDEWAYS: `➡️ ↔️ CONSOLIDATION\n\nRange High: $${data.high24h}\nCurrent: $${data.price}\nRange Low: $${data.low24h}\nPattern: Sideways Movement`
    };

    return patterns[trend];
};

/**
 * Analyze chart patterns with personality
 */
export const analyzeChartPatterns = async (tokenData, tokenAddress, personality = 'AUTISM') => {
    try {
        // Check cache
        const cacheKey = `pattern_${tokenAddress}_${personality}`;
        const cached = await getDocument(COLLECTIONS.ANALYSIS_HISTORY, cacheKey);
        
        if (cached && isCacheValid(cached.timestamp)) {
            return cached.analysis;
        }

        const selectedPersonality = PERSONALITIES[personality] || PERSONALITIES.AUTISM;
        const miniChart = generateMiniChart(tokenData.price);

        const prompt = `${selectedPersonality.context}

${selectedPersonality.style.prefix} Let me analyze this cryptocurrency data with my ${selectedPersonality.style.enthusiasm}!

${miniChart}

Market Data:
${formatTokenData(tokenData)}

Provide a detailed analysis with:
1. **Pattern Analysis** 📊
2. **Volume Insights** 📈
3. **Technical Indicators** 🔍
4. **Risk Assessment** ⚠️
5. **Key Observations** 🎯

Remember to maintain your ${selectedPersonality.name} analyst personality with ${selectedPersonality.style.enthusiasm}!`;

        const result = await model.generateContent(prompt);
        const analysis = result.response.text();

        // Cache result
        await addDocument(COLLECTIONS.ANALYSIS_HISTORY, {
            type: 'pattern',
            tokenAddress,
            personality,
            analysis,
            timestamp: Date.now()
        }, cacheKey);

        return analysis;
    } catch (error) {
        console.error('Error analyzing chart patterns:', error);
        throw error;
    }
};

/**
 * Analyze market sentiment with personality
 */
export const analyzeMarketSentiment = async (tokenData, tokenAddress, personality = 'AUTISM') => {
    try {
        // Check cache
        const cacheKey = `sentiment_${tokenAddress}_${personality}`;
        const cached = await getDocument(COLLECTIONS.ANALYSIS_HISTORY, cacheKey);
        
        if (cached && isCacheValid(cached.timestamp)) {
            return cached.analysis;
        }

        const selectedPersonality = PERSONALITIES[personality] || PERSONALITIES.AUTISM;
        const miniChart = generateMiniChart(tokenData.price);

        const prompt = `${selectedPersonality.context}

${selectedPersonality.style.prefix} Time to analyze the market sentiment with my ${selectedPersonality.style.enthusiasm}!

${miniChart}

Market Data:
${formatTokenData(tokenData)}

Provide a detailed sentiment analysis with:
1. **Market Mood** 🎭
2. **Holder Behavior** 👥
3. **Volume Analysis** 📊
4. **Social Sentiment** 💭
5. **Risk Factors** ⚠️

Remember to maintain your ${selectedPersonality.name} analyst personality with ${selectedPersonality.style.enthusiasm}!`;

        const result = await model.generateContent(prompt);
        const analysis = result.response.text();

        // Cache result
        await addDocument(COLLECTIONS.ANALYSIS_HISTORY, {
            type: 'sentiment',
            tokenAddress,
            personality,
            analysis,
            timestamp: Date.now()
        }, cacheKey);

        return analysis;
    } catch (error) {
        console.error('Error analyzing market sentiment:', error);
        throw error;
    }
};

/**
 * Get specific insights with personality
 */
export const getSpecificInsights = async (tokenData, query, tokenAddress, personality = 'AUTISM') => {
    try {
        // Generate cache key from query
        const cacheKey = `insight_${tokenAddress}_${personality}_${Buffer.from(query).toString('base64')}`;
        const cached = await getDocument(COLLECTIONS.ANALYSIS_HISTORY, cacheKey);
        
        if (cached && isCacheValid(cached.timestamp)) {
            return cached.analysis;
        }

        const selectedPersonality = PERSONALITIES[personality] || PERSONALITIES.AUTISM;
        const miniChart = generateMiniChart(tokenData.price);

        const prompt = `${selectedPersonality.context}

${selectedPersonality.style.prefix} Let me analyze this specific aspect with my ${selectedPersonality.style.enthusiasm}!

User Query: "${query}"

${miniChart}

Market Data:
${formatTokenData(tokenData)}

Provide focused analysis with:
1. **Query Analysis** 🎯
2. **Relevant Patterns** 📊
3. **Key Metrics** 📈
4. **Risk Factors** ⚠️
5. **Recommendations** 💡

Remember to maintain your ${selectedPersonality.name} analyst personality with ${selectedPersonality.style.enthusiasm}!`;

        const result = await model.generateContent(prompt);
        const analysis = result.response.text();

        // Cache result
        await addDocument(COLLECTIONS.ANALYSIS_HISTORY, {
            type: 'specific',
            tokenAddress,
            personality,
            query,
            analysis,
            timestamp: Date.now()
        }, cacheKey);

        return analysis;
    } catch (error) {
        console.error('Error getting specific insights:', error);
        throw error;
    }
};

export default {
    analyzeChartPatterns,
    analyzeMarketSentiment,
    getSpecificInsights,
    PERSONALITIES
};