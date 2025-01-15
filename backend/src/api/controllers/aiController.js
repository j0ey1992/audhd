import { analyzeChartPatterns, analyzeMarketSentiment, getSpecificInsights, PERSONALITIES } from '../../services/ai/geminiService.js';

/**
 * Validate token data middleware
 */
const validateTokenData = (data) => {
    const requiredFields = ['price', 'volume24h', 'marketCap', 'holders'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
};

/**
 * Analyze chart patterns
 * @route POST /api/v1/ai/analyze/patterns
 */
export const analyzePatterns = async (req, res) => {
    try {
        const { tokenAddress, tokenData, personality = 'AUTISM' } = req.body;

        if (!tokenAddress || !tokenData) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Token address and data are required'
            });
        }

        validateTokenData(tokenData);

        const analysis = await analyzeChartPatterns(tokenData, tokenAddress, personality);
        
        res.json({
            success: true,
            data: {
                analysis,
                personality: PERSONALITIES[personality] || PERSONALITIES.AUTISM,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Pattern analysis error:', error);
        res.status(500).json({
            error: 'Analysis Error',
            message: error.message
        });
    }
};

/**
 * Analyze market sentiment
 * @route POST /api/v1/ai/analyze/sentiment
 */
export const analyzeSentiment = async (req, res) => {
    try {
        const { tokenAddress, tokenData, personality = 'AUTISM' } = req.body;

        if (!tokenAddress || !tokenData) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Token address and data are required'
            });
        }

        validateTokenData(tokenData);

        const analysis = await analyzeMarketSentiment(tokenData, tokenAddress, personality);
        
        res.json({
            success: true,
            data: {
                analysis,
                personality: PERSONALITIES[personality] || PERSONALITIES.AUTISM,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Sentiment analysis error:', error);
        res.status(500).json({
            error: 'Analysis Error',
            message: error.message
        });
    }
};

/**
 * Get specific insights
 * @route POST /api/v1/ai/analyze/specific
 */
export const getInsights = async (req, res) => {
    try {
        const { tokenAddress, tokenData, query, personality = 'AUTISM' } = req.body;

        if (!tokenAddress || !tokenData || !query) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Token address, data, and query are required'
            });
        }

        validateTokenData(tokenData);

        const analysis = await getSpecificInsights(tokenData, query, tokenAddress, personality);
        
        res.json({
            success: true,
            data: {
                analysis,
                personality: PERSONALITIES[personality] || PERSONALITIES.AUTISM,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Specific analysis error:', error);
        res.status(500).json({
            error: 'Analysis Error',
            message: error.message
        });
    }
};

/**
 * Get available personalities
 * @route GET /api/v1/ai/personalities
 */
export const getPersonalities = async (req, res) => {
    try {
        res.json({
            success: true,
            data: PERSONALITIES
        });
    } catch (error) {
        console.error('Get personalities error:', error);
        res.status(500).json({
            error: 'Server Error',
            message: error.message
        });
    }
};

export default {
    analyzePatterns,
    analyzeSentiment,
    getInsights,
    getPersonalities
};