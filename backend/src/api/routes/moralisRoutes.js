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
    getTopTokenTraders,
    getPairCandlesticks,
    getTokenOwners,
    getTokenAllowance,
    getWalletApprovals,
    getDefiPositionsSummary,
    getDefiSummary,
    getTopERC20TokensByMarketCap,
    getTopERC20TokensByPriceChange,
    getAggregatedTokenPairStats,
    getDecodedTransactionByHash,
    getContractEvents,
    getContractLogs
} from '../../services/blockchain/moralisService.js';

const router = express.Router();

// Helper function for error handling
const handleRouteError = (error, operation, req, res) => {
    console.error(`Error in ${operation}:`, error.response?.data || error.message);
    const chain = req.query.chain || 'eth';
    const address = req.params.address;
    console.log(`Operation: ${operation}, Chain: ${chain}, Address: ${address}`);
    res.status(error.response?.status || 500).json({
        error: `Failed to ${operation}`,
        details: error.response?.data || error.message,
        chain: chain,
        address: address
    });
};

// Helper function to normalize chain
const normalizeChain = (chain = 'eth') => {
    const chainMap = {
        'eth': 'eth',
        'ethereum': 'eth',
        'cronos': 'cronos',
        'cro': 'cronos',
        'bsc': 'bsc',
        'binance': 'bsc',
        'polygon': 'polygon',
        'matic': 'polygon'
    };
    return chainMap[chain.toLowerCase()] || chain.toLowerCase();
};

// Get token balances
router.get('/erc20/:address/balances', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token balances for ${req.params.address} on chain ${chain}`);
        const data = await getTokenBalances(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token balances', req, res);
    }
});

// Get token price
router.get('/erc20/:address/price', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token price for ${req.params.address} on chain ${chain}`);
        const data = await getTokenPrice(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token price', req, res);
    }
});

// Get token metadata
router.get('/erc20/:address/metadata', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token metadata for ${req.params.address} on chain ${chain}`);
        const data = await getTokenMetadata(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token metadata', req, res);
    }
});

// Get token stats
router.get('/erc20/:address/stats', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token stats for ${req.params.address} on chain ${chain}`);
        const data = await getTokenStats(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token stats', req, res);
    }
});

// Get token transfers
router.get('/erc20/:address/transfers', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token transfers for ${req.params.address} on chain ${chain}`);
        const data = await getTokenTransfers(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token transfers', req, res);
    }
});

// Get token pairs
router.get('/pairs/:address', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token pairs for ${req.params.address} on chain ${chain}`);
        const data = await getTokenPairs(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token pairs', req, res);
    }
});

// Get pair stats
router.get('/pairs/:address/stats', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting pair stats for ${req.params.address} on chain ${chain}`);
        const data = await getPairStats(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch pair stats', req, res);
    }
});

// Get token swaps
router.get('/erc20/:address/swaps', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token swaps for ${req.params.address} on chain ${chain}`);
        const data = await getTokenSwaps(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token swaps', req, res);
    }
});

// Get top token traders
router.get('/erc20/:address/top-gainers', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting top traders for ${req.params.address} on chain ${chain}`);
        const data = await getTopTokenTraders(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch top token traders', req, res);
    }
});

// Get pair candlesticks
router.get('/pairs/:address/ohlcv', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting candlesticks for pair ${req.params.address} on chain ${chain}`);
        const data = await getPairCandlesticks(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch pair candlesticks', req, res);
    }
});

// Get token owners
router.get('/erc20/:address/owners', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting token owners for ${req.params.address} on chain ${chain}`);
        const data = await getTokenOwners(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token owners', req, res);
    }
});

// Get token allowance
router.get('/erc20/:address/allowance', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        const { owner, spender } = req.query;
        console.log(`Getting token allowance for ${req.params.address} on chain ${chain}`);
        const data = await getTokenAllowance(req.params.address, owner, spender, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch token allowance', req, res);
    }
});

// Get wallet approvals
router.get('/wallets/:address/approvals', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting wallet approvals for ${req.params.address} on chain ${chain}`);
        const data = await getWalletApprovals(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch wallet approvals', req, res);
    }
});

// Get DeFi positions summary
router.get('/defi/:address/positions', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting DeFi positions for ${req.params.address} on chain ${chain}`);
        const data = await getDefiPositionsSummary(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch DeFi positions', req, res);
    }
});

// Get DeFi summary
router.get('/defi/:address/summary', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting DeFi summary for ${req.params.address} on chain ${chain}`);
        const data = await getDefiSummary(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch DeFi summary', req, res);
    }
});

// Get top ERC20 tokens by market cap
router.get('/market-data/erc20s/top-tokens', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting top tokens by market cap on chain ${chain}`);
        const data = await getTopERC20TokensByMarketCap(chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch top tokens by market cap', req, res);
    }
});

// Get top ERC20 tokens by price change
router.get('/market-data/erc20s/price-changes', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting top tokens by price change on chain ${chain}`);
        const data = await getTopERC20TokensByPriceChange(chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch top tokens by price change', req, res);
    }
});

// Get aggregated token pair stats
router.get('/pairs/:address/stats/aggregated', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting aggregated pair stats for ${req.params.address} on chain ${chain}`);
        const data = await getAggregatedTokenPairStats(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch aggregated pair stats', req, res);
    }
});

// Get decoded transaction
router.get('/transaction/:hash/decoded', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting decoded transaction ${req.params.hash} on chain ${chain}`);
        const data = await getDecodedTransactionByHash(req.params.hash, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch decoded transaction', req, res);
    }
});

// Get contract events
router.get('/contract/:address/events', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting contract events for ${req.params.address} on chain ${chain}`);
        const data = await getContractEvents(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch contract events', req, res);
    }
});

// Get contract logs
router.get('/contract/:address/logs', async (req, res) => {
    try {
        const chain = normalizeChain(req.query.chain);
        console.log(`Getting contract logs for ${req.params.address} on chain ${chain}`);
        const data = await getContractLogs(req.params.address, chain);
        res.json(data);
    } catch (error) {
        handleRouteError(error, 'fetch contract logs', req, res);
    }
});

export default router;