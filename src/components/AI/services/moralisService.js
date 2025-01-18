import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/moralis';

const moralisClient = axios.create({
    baseURL: API_BASE_URL
});

// Helper function to handle errors
const handleError = (error, operation) => {
    const errorDetails = {
        message: error.response?.data?.details || error.message,
        chain: error.response?.data?.chain,
        address: error.response?.data?.address,
        status: error.response?.status
    };
    console.error(`Moralis ${operation} error:`, errorDetails);
    return { error: errorDetails };
};

// Token Balances and Metadata
export const getTokenBalances = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${address}/balances`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenBalances');
    }
};

// Token Price and Market Data
export const getTokenPrice = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/price`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenPrice');
    }
};

// Get Multiple Token Prices
export const getMultipleTokenPrices = async (addresses, chain = 'eth') => {
    try {
        const response = await moralisClient.post('/erc20/prices', {
            addresses,
            chain
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getMultipleTokenPrices');
    }
};

// Get Token Metadata
export const getTokenMetadata = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/metadata`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenMetadata');
    }
};

// Token Stats
export const getTokenStats = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/stats`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenStats');
    }
};

// Token Transfers
export const getTokenTransfers = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${address}/transfers`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenTransfers');
    }
};

// Get Token Pairs
export const getTokenPairs = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/pairs/${tokenAddress}`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenPairs');
    }
};

// Get Pair Stats
export const getPairStats = async (pairAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/pairs/${pairAddress}/stats`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getPairStats');
    }
};

// Get Token Swaps
export const getTokenSwaps = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/swaps`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenSwaps');
    }
};

// Get Top Token Traders
export const getTopTokenTraders = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/top-gainers`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTopTokenTraders');
    }
};

// Get pair candlesticks
export const getPairCandlesticks = async (pairAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/pairs/${pairAddress}/ohlcv`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getPairCandlesticks');
    }
};

// Get token owners
export const getTokenOwners = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/owners`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenOwners');
    }
};

// Get token allowance
export const getTokenAllowance = async (tokenAddress, owner, spender, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/allowance`, {
            params: { chain, owner, spender }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTokenAllowance');
    }
};

// Get wallet approvals
export const getWalletApprovals = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/wallets/${address}/approvals`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getWalletApprovals');
    }
};

// Get DeFi positions summary
export const getDefiPositionsSummary = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/defi/${address}/positions`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getDefiPositionsSummary');
    }
};

// Get DeFi summary
export const getDefiSummary = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/defi/${address}/summary`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getDefiSummary');
    }
};

// Get top ERC20 tokens by market cap
export const getTopERC20TokensByMarketCap = async (chain = 'eth') => {
    try {
        const response = await moralisClient.get('/market-data/erc20s/top-tokens', {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTopERC20TokensByMarketCap');
    }
};

// Get top ERC20 tokens by price change
export const getTopERC20TokensByPriceChange = async (chain = 'eth') => {
    try {
        const response = await moralisClient.get('/market-data/erc20s/price-changes', {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTopERC20TokensByPriceChange');
    }
};

// Get aggregated token pair stats
export const getAggregatedTokenPairStats = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/pairs/${tokenAddress}/stats/aggregated`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getAggregatedTokenPairStats');
    }
};

// Get decoded transaction
export const getDecodedTransactionByHash = async (hash, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/transaction/${hash}/decoded`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getDecodedTransactionByHash');
    }
};

// Get contract events
export const getContractEvents = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/contract/${address}/events`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getContractEvents');
    }
};

// Get contract logs
export const getContractLogs = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/contract/${address}/logs`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getContractLogs');
    }
};

// Helper function to check if response contains an error
export const hasError = (response) => {
    return response && response.error;
};

// Generate quick action buttons based on token data
export const generateQuickActions = (tokenAddress, chain) => {
    return [
        {
            label: 'View Token Pairs',
            action: () => getTokenPairs(tokenAddress, chain),
            description: 'See all trading pairs for this token'
        },
        {
            label: 'Recent Swaps',
            action: () => getTokenSwaps(tokenAddress, chain),
            description: 'View recent swap transactions'
        },
        {
            label: 'Top Traders',
            action: () => getTopTokenTraders(tokenAddress, chain),
            description: 'See most profitable traders'
        },
        {
            label: 'Token Transfers',
            action: () => getTokenTransfers(tokenAddress, chain),
            description: 'View recent token transfers'
        },
        {
            label: 'Token Owners',
            action: () => getTokenOwners(tokenAddress, chain),
            description: 'View token holder distribution'
        },
        {
            label: 'DeFi Usage',
            action: () => getDefiPositionsSummary(tokenAddress, chain),
            description: 'See how token is used in DeFi'
        },
        {
            label: 'Market Position',
            action: () => getTopERC20TokensByMarketCap(chain),
            description: 'Compare with top tokens'
        },
        {
            label: 'Technical Events',
            action: () => getContractEvents(tokenAddress, chain),
            description: 'View important contract events'
        }
    ];
};

export default {
    getTokenBalances,
    getTokenPrice,
    getMultipleTokenPrices,
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
    getContractLogs,
    hasError,
    generateQuickActions
};