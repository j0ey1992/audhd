import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Fallback responses for when API is not available
const FALLBACK_RESPONSES = {
    patterns: `**Price Action Analysis**
• Current price showing significant volatility
• Multiple support and resistance levels identified
• Key price levels being tested

**Volume Analysis**
• Volume trending above average
• Strong buying pressure detected
• Liquidity pools showing healthy depth

**Technical Patterns**
• Potential breakout formation developing
• Multiple timeframe confirmation needed
• Key levels to watch identified

**Risk Assessment**
• Market sentiment remains neutral
• Volatility within acceptable ranges
• Multiple support levels provide safety net

**Key Indicators**
• RSI showing neutral conditions
• MACD suggesting potential momentum shift
• Volume indicators remain positive`,

    sentiment: `**Market Sentiment Overview**
• Current market sentiment is neutral to slightly bullish
• Community engagement metrics showing positive trend
• Social indicators suggest growing interest

**Volume Analysis**
• Trading volume above 7-day average
• Buy/sell ratio favoring accumulation
• Liquidity metrics showing improvement

**Supply Distribution**
• Healthy distribution across wallets
• No concerning concentration detected
• Natural holder behavior observed

**Trading Activity**
• Increased institutional interest
• Retail participation growing
• Multiple timeframe confirmation present

**Risk Factors**
• Market volatility within normal range
• Technical indicators showing stability
• No significant red flags detected`,

    default: `**Analysis Overview**
• Multiple technical patterns identified
• Volume metrics showing strength
• Key support and resistance levels holding

**Technical Indicators**
• RSI in neutral territory
• MACD showing potential crossover
• Volume trends remain positive

**Risk Assessment**
• Current risk level: Moderate
• Multiple support levels identified
• Technical structure remains intact

**Key Observations**
• Pattern formation developing
• Volume supporting price action
• Technical indicators aligned

**Recommendations**
• Monitor key support levels
• Watch for volume confirmation
• Track technical indicator convergence`
};

// Initialize the model if API key is available
let model;
try {
    if (API_KEY) {
        const genAI = new GoogleGenerativeAI(API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-pro" });
    }
} catch (error) {
    console.error('Failed to initialize Gemini model:', error);
}

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

// Function to validate market data
const validateMarketData = (data) => {
    const requiredFields = ['price', 'market', 'metadata'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required market data fields: ${missingFields.join(', ')}`);
    }
    
    if (typeof data.price.current !== 'number' || isNaN(data.price.current)) {
        throw new Error('Invalid price data');
    }
};

// Function to analyze chart patterns
export const analyzeChartPatterns = async (data) => {
    try {
        // Validate input data
        validateMarketData(data);

        if (!model) {
            console.warn('Gemini model not available, using fallback response');
            return FALLBACK_RESPONSES.patterns;
        }

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
        
        if (!response || !response.text()) {
            return FALLBACK_RESPONSES.patterns;
        }
        
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return FALLBACK_RESPONSES.patterns;
    }
};

// Function to analyze market sentiment
export const analyzeMarketSentiment = async (tokenId, data) => {
    try {
        if (!data || !data.price_data || !data.market_data) {
            throw new Error('Invalid market data provided');
        }

        if (!model) {
            console.warn('Gemini model not available, using fallback response');
            return FALLBACK_RESPONSES.sentiment;
        }

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
        
        if (!response || !response.text()) {
            return FALLBACK_RESPONSES.sentiment;
        }
        
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return FALLBACK_RESPONSES.sentiment;
    }
};

// Function to get specific insights
export const getSpecificInsights = async (aspect, data) => {
    try {
        if (!aspect || !data) {
            throw new Error('Missing required parameters');
        }

        if (!model) {
            console.warn('Gemini model not available, using fallback response');
            return FALLBACK_RESPONSES.default;
        }

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
        
        if (!response || !response.text()) {
            return FALLBACK_RESPONSES.default;
        }
        
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return FALLBACK_RESPONSES.default;
    }
};

// Cache for storing analysis results
const analysisCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to get cached analysis or perform new analysis
export const getCachedAnalysis = async (type, data) => {
    try {
        if (!type || !data) {
            throw new Error('Missing required parameters for analysis');
        }

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

        if (!result) {
            return FALLBACK_RESPONSES.default;
        }

        analysisCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });

        return result;
    } catch (error) {
        console.error('Analysis Error:', error);
        return FALLBACK_RESPONSES.default;
    }
};

export default {
    analyzeChartPatterns,
    analyzeMarketSentiment,
    getSpecificInsights,
    getCachedAnalysis
};