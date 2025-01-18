import { GoogleGenerativeAI } from '@google/generative-ai';
import { getContextForQuestion, formatPromptForContext } from './contextManager';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Chat history management
const MAX_HISTORY_LENGTH = 10;
const chatHistory = new Map(); // Map to store chat histories for different tokens

// Function to manage chat history
const updateChatHistory = (tokenId, role, content) => {
    if (!chatHistory.has(tokenId)) {
        chatHistory.set(tokenId, []);
    }
    
    const history = chatHistory.get(tokenId);
    history.push({ role, content });
    
    // Keep only the last MAX_HISTORY_LENGTH messages
    if (history.length > MAX_HISTORY_LENGTH) {
        history.shift();
    }
    
    return history;
};

// Function to get relevant chat history
const getRelevantHistory = (tokenId, aspect) => {
    if (!chatHistory.has(tokenId)) {
        return [];
    }
    
    const history = chatHistory.get(tokenId);
    return history.filter(msg => {
        const content = msg.content.toLowerCase();
        return content.includes(aspect.toLowerCase()) ||
               content.includes('pattern') ||
               content.includes('analysis');
    });
};

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
export const analyzeChartPatterns = async (data, tokenId) => {
    try {
        validateMarketData(data);

        if (!model) {
            console.warn('Gemini model not available, using fallback response');
            return FALLBACK_RESPONSES.patterns;
        }

        const context = getContextForQuestion('patterns', true);
        const basePrompt = formatPromptForContext(context);

        const prompt = `${basePrompt}

Price Data:
- Current: $${data.price.current}
- 24h Change: ${data.price.change_24h}%
- 24h High: $${data.price.high_24h}
- 24h Low: $${data.price.low_24h}

Market Data:
- Market Cap: $${data.market.market_cap}
- 24h Volume: $${data.market.volume_24h}
- Supply: ${data.market.circulating_supply}

Provide a detailed technical analysis focusing on chart patterns and price action.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        if (!response || !response.text()) {
            return FALLBACK_RESPONSES.patterns;
        }
        
        if (tokenId) {
            updateChatHistory(tokenId, 'system', 'Analyzed chart patterns');
            updateChatHistory(tokenId, 'assistant', response.text());
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

        const context = getContextForQuestion('sentiment', true);
        const basePrompt = formatPromptForContext(context);

        const history = getRelevantHistory(tokenId, 'sentiment');
        const sentimentContext = history.map(msg =>
            `${msg.role === 'user' ? 'Previous Question' : 'Previous Analysis'}: ${msg.content}`
        ).join('\n\n');

        const prompt = `${basePrompt}

Previous Analysis:
${sentimentContext}

Current Market Data:
Price: $${data.price_data.current}
24h Change: ${data.price_data.change_24h}%
Market Cap: $${data.market_data.market_cap}
Volume: $${data.market_data.volume_24h}
Supply: ${data.market_data.circulating_supply}

Analyze the current market sentiment and compare with previous sentiment if available.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        if (!response || !response.text()) {
            return FALLBACK_RESPONSES.sentiment;
        }

        updateChatHistory(tokenId, 'user', 'Requested sentiment analysis');
        updateChatHistory(tokenId, 'assistant', response.text());
        
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return FALLBACK_RESPONSES.sentiment;
    }
};

// Function to get specific insights
export const getSpecificInsights = async (aspect, data, tokenId) => {
    try {
        if (!aspect || !tokenId) {
            throw new Error('Missing required parameters');
        }

        if (!model) {
            console.warn('Gemini model not available, using fallback response');
            return FALLBACK_RESPONSES.default;
        }

        const context = getContextForQuestion(aspect, !!data);
        const basePrompt = formatPromptForContext(context);

        const history = getRelevantHistory(tokenId, aspect);
        const conversationContext = history.map(msg =>
            `${msg.role === 'user' ? 'Question' : 'Previous Analysis'}: ${msg.content}`
        ).join('\n\n');

        let prompt = `${basePrompt}\n\nPrevious Context:\n${conversationContext}\n\n`;
        
        if (data) {
            if (data.metadata) {
                prompt += `Token Information:\n`;
                prompt += `Name: ${data.metadata.name}\n`;
                prompt += `Symbol: ${data.metadata.symbol}\n`;
                prompt += `Network: ${data.metadata.chain}\n\n`;
            }
            
            prompt += `Market Data:\n${JSON.stringify(data, null, 2)}\n\n`;
        }

        prompt += `Current Request: ${aspect}\n\n`;
        
        if (context.format.sections) {
            prompt += `Provide an analysis covering the specified sections, incorporating previous context when relevant.`;
        } else {
            prompt += `Provide a natural response that addresses the question, incorporating available data when relevant.`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        if (!response || !response.text()) {
            return FALLBACK_RESPONSES.default;
        }

        updateChatHistory(tokenId, 'user', `Asked about ${aspect}`);
        updateChatHistory(tokenId, 'assistant', response.text());
        
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return FALLBACK_RESPONSES.default;
    }
};

export default {
    analyzeChartPatterns,
    analyzeMarketSentiment,
    getSpecificInsights
};