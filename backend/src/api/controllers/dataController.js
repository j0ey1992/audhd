import { getTokenData, getTradingPairs } from '../../services/data/dexService.js';

/**
 * Get token data
 * @route GET /api/v1/data/token/:address
 */
export const getToken = async (req, res) => {
    try {
        const { address } = req.params;

        if (!address) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Token address is required'
            });
        }

        const tokenData = await getTokenData(address);
        
        res.json({
            success: true,
            data: tokenData
        });
    } catch (error) {
        console.error('Error fetching token data:', error);
        res.status(500).json({
            error: 'Data Fetch Error',
            message: error.message
        });
    }
};

/**
 * Get token trading pairs
 * @route GET /api/v1/data/pairs/:address
 */
export const getPairs = async (req, res) => {
    try {
        const { address } = req.params;

        if (!address) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Token address is required'
            });
        }

        const pairs = await getTradingPairs(address);
        
        res.json({
            success: true,
            data: pairs
        });
    } catch (error) {
        console.error('Error fetching trading pairs:', error);
        res.status(500).json({
            error: 'Data Fetch Error',
            message: error.message
        });
    }
};

/**
 * Validate token address
 * @route POST /api/v1/data/validate
 */
export const validateAddress = async (req, res) => {
    try {
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Token address is required'
            });
        }

        // Basic address validation
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            return res.json({
                success: true,
                data: {
                    valid: false,
                    reason: 'Invalid address format'
                }
            });
        }

        // Try to fetch token data to validate
        try {
            await getTokenData(address);
            return res.json({
                success: true,
                data: {
                    valid: true
                }
            });
        } catch (error) {
            return res.json({
                success: true,
                data: {
                    valid: false,
                    reason: 'Token not found or invalid'
                }
            });
        }
    } catch (error) {
        console.error('Error validating address:', error);
        res.status(500).json({
            error: 'Validation Error',
            message: error.message
        });
    }
};

export default {
    getToken,
    getPairs,
    validateAddress
};