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
export const getTokenBalances = async (address) => {
    try {
        const response = await moralisClient.get(`/${address}/erc20`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenBalances error:', error);
        throw error;
    }
};

// Token Price and Market Data
export const getTokenPrice = async (tokenAddress) => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/price`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenPrice error:', error);
        throw error;
    }
};

// Token Stats
export const getTokenStats = async (tokenAddress) => {
    try {
        const response = await moralisClient.get(`/erc20/${tokenAddress}/stats`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenStats error:', error);
        throw error;
    }
};

// Token Transfers
export const getTokenTransfers = async (address) => {
    try {
        const response = await moralisClient.get(`/${address}/erc20/transfers`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenTransfers error:', error);
        throw error;
    }
};

export default {
    getTokenBalances,
    getTokenPrice,
    getTokenStats,
    getTokenTransfers
};