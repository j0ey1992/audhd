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
        const data = await getTokenBalances(req.params.address);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token balances:', error);
        res.status(500).json({ error: 'Failed to fetch token balances' });
    }
});

// Get token price
router.get('/token/:address/price', async (req, res) => {
    try {
        const data = await getTokenPrice(req.params.address);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token price:', error);
        res.status(500).json({ error: 'Failed to fetch token price' });
    }
});

// Get token stats
router.get('/token/:address/stats', async (req, res) => {
    try {
        const data = await getTokenStats(req.params.address);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token stats:', error);
        res.status(500).json({ error: 'Failed to fetch token stats' });
    }
});

// Get token transfers
router.get('/token/:address/transfers', async (req, res) => {
    try {
        const data = await getTokenTransfers(req.params.address);
        res.json(data);
    } catch (error) {
        console.error('Error fetching token transfers:', error);
        res.status(500).json({ error: 'Failed to fetch token transfers' });
    }
});

export default router;