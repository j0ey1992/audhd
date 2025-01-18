import express from 'express';
import { 
    getTokenBalances,
    getTokenPrice,
    getTokenStats,
    getTokenTransfers
} from '../../services/blockchain/moralisService.js';

const router = express.Router();

// Get token balances
router.get('/token/:address/balances', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenBalances(req.params.address, chain);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token balances:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch token balances',
            details: error.response?.data || error.message,
            chain: req.query.chain,
            address: req.params.address
        });
    }
});

// Get token price
router.get('/token/:address/price', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        console.log(`Requesting token price for address: ${req.params.address} on chain: ${chain}`);
        
        const data = await getTokenPrice(req.params.address, chain);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token price:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch token price',
            details: error.response?.data || error.message,
            chain: req.query.chain,
            address: req.params.address
        });
    }
});

// Get token stats
router.get('/token/:address/stats', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenStats(req.params.address, chain);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token stats:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch token stats',
            details: error.response?.data || error.message,
            chain: req.query.chain,
            address: req.params.address
        });
    }
});

// Get token transfers
router.get('/token/:address/transfers', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenTransfers(req.params.address, chain);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token transfers:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch token transfers',
            details: error.response?.data || error.message,
            chain: req.query.chain,
            address: req.params.address
        });
    }
});

export default router;