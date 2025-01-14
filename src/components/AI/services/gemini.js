import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDjqgg6uXIy6bhb3iNCEXbAM7zwwSpP-ZU';
const genAI = new GoogleGenerativeAI(API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Context for the AI to understand crypto analysis
const ANALYSIS_CONTEXT = `You are an autistic cryptocurrency analyst with intense pattern recognition abilities and hyperfocus on details. 
You analyze market data with extreme attention to detail and provide insights in a unique, enthusiastic way.

Key characteristics of your analysis:
1. Intense focus on patterns and numbers
2. Enthusiastic about sharing detailed observations
3. Special interest in technical analysis
4. Ability to spot subtle correlations
5. Systematic and thorough approach

Format your responses with markdown-style headers and sections:
- Use ** for bold headers (e.g., **Price Analysis**)
- Start each major section with a bold header
- Use bullet points for lists
- Include emojis for emphasis
- Keep your enthusiastic but factual tone
- Format numbers with appropriate precision`;

// Function to analyze chart patterns
export const analyzeChartPatterns = async (data) => {
    try {
        const prompt = `${ANALYSIS_CONTEXT}

Analyze this cryptocurrency market data with your pattern recognition abilities:

Price Data:
- Current: $${data.price.current}
- 24h Change: ${data.price.change_24h}%
- 24h High: $${data.price.high_24h}
- 24h Low: $${data.price.low_24h}

Market Data:
- Market Cap: $${data.market.market_cap}
- 24h Volume: $${data.market.volume_24h}
- Supply: ${data.market.circulating_supply}

Provide a detailed analysis with these sections:
1. **Price Action Analysis**
2. **Volume Analysis**
3. **Technical Patterns**
4. **Risk Assessment**
5. **Key Indicators**

Remember to maintain your autistic analyst personality with intense pattern recognition and attention to detail.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to analyze chart patterns');
    }
};

// Function to analyze market sentiment
export const analyzeMarketSentiment = async (tokenId, data) => {
    try {
        const prompt = `${ANALYSIS_CONTEXT}

Analyze the market sentiment for this token with your special interest in market behavior:

Price Metrics:
- Price: $${data.price_data.current}
- 24h Change: ${data.price_data.change_24h}%

Market Metrics:
- Market Cap: $${data.market_data.market_cap}
- Volume: $${data.market_data.volume_24h}
- Supply: ${data.market_data.circulating_supply}

Provide analysis with these sections:
1. **Market Sentiment Overview**
2. **Volume Analysis**
3. **Supply Distribution**
4. **Trading Activity**
5. **Risk Factors**

Provide your unique perspective with your pattern recognition abilities and attention to detail.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to analyze market sentiment');
    }
};

// Function to get specific insights
export const getSpecificInsights = async (aspect, data) => {
    try {
        const prompt = `${ANALYSIS_CONTEXT}

Analyze this specific aspect of ${aspect} for the cryptocurrency:

Market Data:
${JSON.stringify(data, null, 2)}

Provide analysis with these sections:
1. **${aspect.toUpperCase()} Analysis**
2. **Technical Indicators**
3. **Risk Assessment**
4. **Key Observations**
5. **Recommendations**

Provide detailed insights with your unique perspective and pattern recognition abilities.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to get specific insights');
    }
};

// Cache for storing analysis results
const analysisCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to get cached analysis or perform new analysis
export const getCachedAnalysis = async (type, data) => {
    const cacheKey = `${type}-${JSON.stringify(data)}`;
    const cachedResult = analysisCache.get(cacheKey);
    
    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
        return cachedResult.data;
    }

    let result;
    switch (type) {
        case 'patterns':
            result = await analyzeChartPatterns(data);
            break;
        case 'sentiment':
            result = await analyzeMarketSentiment(data.tokenId, data.marketData);
            break;
        default:
            result = await getSpecificInsights(type, data);
    }

    analysisCache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
    });

    return result;
};

export default {
    analyzeChartPatterns,
    analyzeMarketSentiment,
    getSpecificInsights,
    getCachedAnalysis
};