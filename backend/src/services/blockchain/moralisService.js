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

// Token Balances and Metadata
export const getTokenBalances = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token balances for ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/${address}/erc20`, {
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
        const response = await moralisClient.get(`/erc20/${tokenAddress}/price`, {
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
                addresses: [tokenAddress]
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
        const response = await moralisClient.get(`/erc20/${tokenAddress}/stats`, {
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
        const response = await moralisClient.get(`/${address}/erc20/transfers`, {
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
        const response = await moralisClient.get(`/pairs/${tokenAddress}`, {
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
        const response = await moralisClient.get(`/erc20/${tokenAddress}/swaps`, {
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
        const response = await moralisClient.get(`/erc20/${tokenAddress}/top-gainers`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTopTokenTraders error:', error.response?.data || error);
        throw error;
    }
};

// Get Pair Candlesticks
export const getPairCandlesticks = async (pairAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching candlesticks for pair ${pairAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/pairs/${pairAddress}/ohlcv`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getPairCandlesticks error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Owners
export const getTokenOwners = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token owners for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/nft/${tokenAddress}/owners`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenOwners error:', error.response?.data || error);
        throw error;
    }
};

// Get Token Allowance
export const getTokenAllowance = async (tokenAddress, owner, spender, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching token allowance for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/erc20/${tokenAddress}/allowance`, {
            params: {
                chain: normalizedChain,
                owner,
                spender
            }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTokenAllowance error:', error.response?.data || error);
        throw error;
    }
};

// Get Wallet Approvals
export const getWalletApprovals = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching wallet approvals for ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/wallets/${address}/approvals`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getWalletApprovals error:', error.response?.data || error);
        throw error;
    }
};

// Get DeFi Positions Summary
export const getDefiPositionsSummary = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching DeFi positions for ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/wallets/${address}/defi/positions`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getDefiPositionsSummary error:', error.response?.data || error);
        throw error;
    }
};

// Get DeFi Summary
export const getDefiSummary = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching DeFi summary for ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/wallets/${address}/defi/summary`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getDefiSummary error:', error.response?.data || error);
        throw error;
    }
};

// Get Top ERC20 Tokens By Market Cap
export const getTopERC20TokensByMarketCap = async (chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching top tokens by market cap on chain ${normalizedChain}`);
        const response = await moralisClient.get('/market-data/erc20s/top-tokens', {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTopERC20TokensByMarketCap error:', error.response?.data || error);
        throw error;
    }
};

// Get Top ERC20 Tokens By Price Change
export const getTopERC20TokensByPriceChange = async (chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching top tokens by price change on chain ${normalizedChain}`);
        const response = await moralisClient.get('/market-data/erc20s/price-changes', {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getTopERC20TokensByPriceChange error:', error.response?.data || error);
        throw error;
    }
};

// Get Aggregated Token Pair Stats
export const getAggregatedTokenPairStats = async (tokenAddress, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching aggregated pair stats for ${tokenAddress} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/pairs/${tokenAddress}/stats/aggregated`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getAggregatedTokenPairStats error:', error.response?.data || error);
        throw error;
    }
};

// Get Decoded Transaction
export const getDecodedTransactionByHash = async (hash, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching decoded transaction ${hash} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/transaction/${hash}/verbose`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getDecodedTransactionByHash error:', error.response?.data || error);
        throw error;
    }
};

// Get Contract Events
export const getContractEvents = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching events for contract ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/${address}/events`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getContractEvents error:', error.response?.data || error);
        throw error;
    }
};

// Get Contract Logs
export const getContractLogs = async (address, chain = 'eth') => {
    try {
        const normalizedChain = normalizeChain(chain);
        console.log(`Fetching logs for contract ${address} on chain ${normalizedChain}`);
        const response = await moralisClient.get(`/${address}/logs`, {
            params: { chain: normalizedChain }
        });
        return response.data;
    } catch (error) {
        console.error('Moralis getContractLogs error:', error.response?.data || error);
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
};