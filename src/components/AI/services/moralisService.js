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

// Helper function to check if response contains an error
export const hasError = (response) => {
    return response && response.error;
};

export default {
    getTokenBalances,
    getTokenPrice,
    getTokenStats,
    getTokenTransfers,
    hasError
};