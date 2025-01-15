import axios from 'axios';
import { config } from '../../config.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours cache for risk data
const API_KEY = config.riskAssessment?.chainanalysis?.apiKey;

// Risk levels
const RISK_LEVELS = {
    SEVERE: 'severe',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NONE: 'none'
};

/**
 * Format risk data from Chainanalysis response
 */
const formatRiskData = (data) => {
    return {
        risk_level: data.risk_level.toLowerCase(),
        risk_score: data.risk_score,
        categories: data.risk_categories.map(cat => ({
            name: cat.name,
            score: cat.score,
            description: cat.description
        })),
        alerts: data.alerts.map(alert => ({
            type: alert.type,
            severity: alert.severity,
            description: alert.description,
            timestamp: alert.timestamp
        })),
        metadata: {
            address: data.address,
            chain: data.chain,
            last_updated: data.last_updated,
            analysis_version: data.analysis_version
        }
    };
};

/**
 * Get wallet risk assessment
 */
export const getWalletRisk = async (address, chain = 'ethereum') => {
    try {
        if (!API_KEY) {
            throw new Error('Chainanalysis API key not configured');
        }

        // Check cache
        const cacheKey = `chainanalysis_wallet_${chain}_${address}`;
        const cached = await getDocument(COLLECTIONS.RISK_ASSESSMENT_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from Chainanalysis
        const response = await axios.get(`https://api.chainanalysis.com/v1/risk/${chain}/address/${address}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        const formattedData = formatRiskData(response.data);

        // Cache result
        await addDocument(COLLECTIONS.RISK_ASSESSMENT_CACHE, {
            data: formattedData,
            timestamp: Date.now()
        }, cacheKey);

        return formattedData;
    } catch (error) {
        console.error('Error fetching wallet risk:', error);
        throw new Error(`Failed to fetch wallet risk: ${error.message}`);
    }
};

/**
 * Get transaction risk assessment
 */
export const getTransactionRisk = async (txHash, chain = 'ethereum') => {
    try {
        if (!API_KEY) {
            throw new Error('Chainanalysis API key not configured');
        }

        // Check cache
        const cacheKey = `chainanalysis_tx_${chain}_${txHash}`;
        const cached = await getDocument(COLLECTIONS.RISK_ASSESSMENT_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from Chainanalysis
        const response = await axios.get(`https://api.chainanalysis.com/v1/risk/${chain}/transaction/${txHash}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        const formattedData = {
            risk_level: response.data.risk_level.toLowerCase(),
            risk_score: response.data.risk_score,
            details: {
                from_address: {
                    address: response.data.from_address,
                    risk_level: response.data.from_risk_level.toLowerCase(),
                    risk_score: response.data.from_risk_score
                },
                to_address: {
                    address: response.data.to_address,
                    risk_level: response.data.to_risk_level.toLowerCase(),
                    risk_score: response.data.to_risk_score
                }
            },
            alerts: response.data.alerts.map(alert => ({
                type: alert.type,
                severity: alert.severity,
                description: alert.description,
                timestamp: alert.timestamp
            })),
            metadata: {
                chain,
                transaction_hash: txHash,
                block_number: response.data.block_number,
                timestamp: response.data.timestamp,
                analysis_version: response.data.analysis_version
            }
        };

        // Cache result
        await addDocument(COLLECTIONS.RISK_ASSESSMENT_CACHE, {
            data: formattedData,
            timestamp: Date.now()
        }, cacheKey);

        return formattedData;
    } catch (error) {
        console.error('Error fetching transaction risk:', error);
        throw new Error(`Failed to fetch transaction risk: ${error.message}`);
    }
};

/**
 * Monitor address for risk changes
 */
export const monitorAddress = async (address, chain = 'ethereum', webhookUrl) => {
    try {
        if (!API_KEY) {
            throw new Error('Chainanalysis API key not configured');
        }

        const response = await axios.post(`https://api.chainanalysis.com/v1/monitoring/${chain}/address`, {
            address,
            webhook_url: webhookUrl
        }, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        return {
            monitoring_id: response.data.monitoring_id,
            status: response.data.status,
            created_at: response.data.created_at
        };
    } catch (error) {
        console.error('Error setting up address monitoring:', error);
        throw new Error(`Failed to set up address monitoring: ${error.message}`);
    }
};

/**
 * Get risk categories
 */
export const getRiskCategories = async () => {
    try {
        if (!API_KEY) {
            throw new Error('Chainanalysis API key not configured');
        }

        const response = await axios.get('https://api.chainanalysis.com/v1/risk-categories', {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        return response.data.categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            severity: cat.severity
        }));
    } catch (error) {
        console.error('Error fetching risk categories:', error);
        throw new Error(`Failed to fetch risk categories: ${error.message}`);
    }
};

export default {
    getWalletRisk,
    getTransactionRisk,
    monitorAddress,
    getRiskCategories,
    RISK_LEVELS
};