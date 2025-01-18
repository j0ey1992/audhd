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

// Token Balances and Metadata
export const getTokenBalances = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/${address}/erc20?chain=${chain}`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenBalances error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            chain,
            address
        });
        throw error;
    }
};

// Token Price and Market Data
export const getTokenPrice = async (tokenAddress, chain = 'eth') => {
    try {
        // Normalize chain name to match Moralis expected format
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

        const normalizedChain = chainMap[chain.toLowerCase()] || chain.toLowerCase();
        console.log(`Fetching token price for address: ${tokenAddress} on chain: ${normalizedChain}`);

        const response = await moralisClient.get(`/erc20/${tokenAddress}/price`, {
            params: {
                chain: normalizedChain
            }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenPrice error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            chain,
            tokenAddress
        });
        throw error;
    }
};

// Token Stats
export const getTokenStats = async (tokenAddress, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/stats?chain=${chain}`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenStats error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            chain,
            tokenAddress
        });
        throw error;
    }
};

// Token Transfers
export const getTokenTransfers = async (address, chain = 'eth') => {
    try {
        const response = await moralisClient.get(`/${address}/erc20/transfers?chain=${chain}`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenTransfers error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            chain,
            address
        });
        throw error;
    }
};

export default {
    getTokenBalances,
    getTokenPrice,
    getTokenStats,
    getTokenTransfers
};