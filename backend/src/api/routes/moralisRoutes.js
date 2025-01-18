import express from 'express';
import { 
    getTokenBalances,
    getTokenPrice,
    getTokenMetadata,
    getTokenStats,
    getTokenTransfers,
    getTokenPairs,
    getPairStats,
    getTokenSwaps,
    getTopTokenTraders
} from '../../services/blockchain/moralisService.js';

const router = express.Router();

// Helper function for error handling
const handleRouteError = (error, operation, req, res) => {
    console.error(`Error in ${operation}:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
        error: `Failed to ${operation}`,
        details: error.response?.data || error.message,
        chain: req.query.chain,
        address: req.params.address
    });
};

// Get token balances
router.get('/token/:address/balances', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenBalances(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token balances', req, res);
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
        handleRouteError(error, 'fetch token price', req, res);
    }
});

// Get token metadata
router.get('/token/:address/metadata', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenMetadata(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token metadata', req, res);
    }
});

// Get token stats
router.get('/token/:address/stats', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenStats(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token stats', req, res);
    }
});

// Get token transfers
router.get('/token/:address/transfers', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenTransfers(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token transfers', req, res);
    }
});

// Get token pairs
router.get('/token/:address/pairs', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getTokenPairs(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token pairs', req, res);
    }
});

// Get pair stats
router.get('/pairs/:address/stats', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        const data = await getPairStats(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch pair stats', req, res);
    }
});

// Get token swaps
router.get('/token/:address/swaps', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        console.log(`Fetching swaps for token ${req.params.address} on chain ${chain}`);
        const data = await getTokenSwaps(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token swaps', req, res);
    }
});

// Get top token traders (using top-gainers endpoint)
router.get('/token/:address/top-gainers', async (req, res) => {
    try {
        const chain = req.query.chain || 'eth';
        console.log(`Fetching top traders for token ${req.params.address} on chain ${chain}`);
        const data = await getTopTokenTraders(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch top token traders', req, res);
    }
});

export default router;