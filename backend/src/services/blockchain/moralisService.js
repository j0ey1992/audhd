import axios from 'axios';

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const BASE_URL = 'https://deep-index.moralis.io/api/v2.2';

const moralisClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
    }
});

// Helper function to normalize chain names
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

// Helper function to get chain-specific endpoint
const getChainEndpoint = (chain, type, address) => {
    const normalizedChain = normalizeChain(chain);
    const baseEndpoint = normalizedChain === 'cronos' ? '/cronos' : '/erc20';
    
    switch (type) {
        case 'swaps':
            return `${baseEndpoint}/${address}/swaps`;
        case 'top-gainers':
            return `${baseEndpoint}/${address}/top-gainers`;
        case 'transfers':
            return `${baseEndpoint}/${address}/transfers`;
        case 'stats':
            return `${baseEndpoint}/${address}/stats`;
        case 'price':
            return `${baseEndpoint}/${address}/price`;
        default:
            return `${baseEndpoint}/${address}/${type}`;
    }
};

// Token Balances and Metadata
export const getTokenBalances = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token balances for ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(getChainEndpoint(chain, 'balances', address), {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenBalances error:', error.response?.data || error);
        throw error;
    }
};

// Token Price and Market Data
export const getTokenPrice = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token price for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(getChainEndpoint(chain, 'price', tokenAddress), {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenPrice error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Metadata
export const getTokenMetadata = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token metadata for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/erc20/metadata`, {
            params: {
                chain: normalizedChain,
                addresses: tokenAddress
            }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenMetadata error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Stats
export const getTokenStats = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token stats for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(getChainEndpoint(chain, 'stats', tokenAddress), {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenStats error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Transfers
export const getTokenTransfers = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token transfers for ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(getChainEndpoint(chain, 'transfers', address), {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenTransfers error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Pairs
export const getTokenPairs = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token pairs for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/${tokenAddress}/pairs`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenPairs error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Pair Stats
export const getPairStats = async (pairAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching pair stats for ${pairAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/pairs/${pairAddress}/stats`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getPairStats error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Swaps
export const getTokenSwaps = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching swaps for token ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(getChainEndpoint(chain, 'swaps', tokenAddress), {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenSwaps error:', error.response?.data || error);
        throw error;
    }
};

// Get Top Token Traders
export const getTopTokenTraders = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching top traders for token ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(getChainEndpoint(chain, 'top-gainers', tokenAddress), {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTopTokenTraders error:', error.response?.data || error);
        throw error;
    }
};

export default {
    getTokenBalances,
    getTokenPrice,
    getTokenMetadata,
    getTokenStats,
    getTokenTransfers,
    getTokenPairs,
    getPairStats,
    getTokenSwaps,
    getTopTokenTraders
};