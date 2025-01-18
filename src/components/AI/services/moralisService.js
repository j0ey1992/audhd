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
        const response = await moralisClient.get(`/token/${address}/balances`, {
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
        console.log(`Requesting token price for address: ${tokenAddress} on chain: ${chain}`);
        const response = await moralisClient.get(`/token/${tokenAddress}/price`, {
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
        const response = await moralisClient.post('/token/prices', {
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
        const response = await moralisClient.get(`/token/${tokenAddress}/metadata`, {
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
        const response = await moralisClient.get(`/token/${tokenAddress}/stats`, {
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
        const response = await moralisClient.get(`/token/${address}/transfers`, {
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
        const response = await moralisClient.get(`/token/${tokenAddress}/pairs`, {
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
        console.log(`Requesting swaps for token: ${tokenAddress} on chain: ${chain}`);
        const response = await moralisClient.get(`/token/${tokenAddress}/swaps`, {
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
        console.log(`Requesting top traders for token: ${tokenAddress} on chain: ${chain}`);
        const response = await moralisClient.get(`/token/${tokenAddress}/top-gainers`, {
            params: { chain }
        });
        return response.data;
    } catch (error) {
        return handleError(error, 'getTopTokenTraders');
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
    hasError,
    generateQuickActions
};