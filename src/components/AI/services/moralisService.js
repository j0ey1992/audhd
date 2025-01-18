import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/moralis';

const moralisClient = axios.create({
    baseURL: API_BASE_URL
});

// Token Balances and Metadata
export const getTokenBalances = async (address) => {
    try {
        const response = await moralisClient.get(`/token/${address}/balances`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenBalances error:', error);
        return null;
    }
};

// Token Price and Market Data
export const getTokenPrice = async (tokenAddress) => {
    try {
        const response = await moralisClient.get(`/token/${tokenAddress}/price`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenPrice error:', error);
        return null;
    }
};

// Token Stats
export const getTokenStats = async (tokenAddress) => {
    try {
        const response = await moralisClient.get(`/token/${tokenAddress}/stats`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenStats error:', error);
        return null;
    }
};

// Token Transfers
export const getTokenTransfers = async (address) => {
    try {
        const response = await moralisClient.get(`/token/${address}/transfers`);
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenTransfers error:', error);
        return null;
    }
};

export default {
    getTokenBalances,
    getTokenPrice,
    getTokenStats,
    getTokenTransfers
};