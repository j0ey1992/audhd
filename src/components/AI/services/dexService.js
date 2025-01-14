import axios from 'axios';

const DEX_SCREENER_BASE_URL = 'https://api.dexscreener.com/latest/dex';

// Function to get token data by contract address
export const getTokenByContract = async (contractAddress) => {
    try {
        const response = await axios.get(`${DEX_SCREENER_BASE_URL}/tokens/${contractAddress}`);
        
        if (!response.data.pairs || response.data.pairs.length === 0) {
            throw new Error('No trading pairs found for this token');
        }

        // Get the most liquid pair
        const mainPair = response.data.pairs.reduce((prev, current) => {
            return (prev.liquidity?.usd > current.liquidity?.usd) ? prev : current;
        });

        // Format data for analysis
        return {
            price: {
                current: parseFloat(mainPair.priceUsd || 0),
                change_24h: parseFloat(mainPair.priceChange?.h24 || 0),
                high_24h: parseFloat(mainPair.priceUsd) * (1 + Math.abs(parseFloat(mainPair.priceChange?.h24 || 0)) / 100),
                low_24h: parseFloat(mainPair.priceUsd) * (1 - Math.abs(parseFloat(mainPair.priceChange?.h24 || 0)) / 100)
            },
            market: {
                market_cap: parseFloat(mainPair.fdv || 0),
                volume_24h: parseFloat(mainPair.volume?.h24 || 0),
                liquidity: parseFloat(mainPair.liquidity?.usd || 0),
                circulating_supply: parseFloat(mainPair.liquidity?.base || 0)
            },
            metadata: {
                name: mainPair.baseToken.name,
                symbol: mainPair.baseToken.symbol,
                chain: mainPair.chainId,
                dex: mainPair.dexId,
                pairAddress: mainPair.pairAddress
            },
            chart: {
                prices: mainPair.priceUsd ? [{
                    time: Date.now(),
                    value: parseFloat(mainPair.priceUsd)
                }] : []
            }
        };
    } catch (error) {
        console.error('DexScreener API Error:', error);
        throw new Error('Failed to fetch token data');
    }
};

// Function to get price history (simulated as DexScreener doesn't provide historical data in free tier)
export const getPriceHistory = async (contractAddress) => {
    try {
        const currentData = await getTokenByContract(contractAddress);
        const currentPrice = currentData.price.current;
        
        // Generate simulated historical data based on current price and 24h change
        const history = [];
        const hoursAgo = 24;
        const now = Date.now();
        
        for (let i = hoursAgo; i >= 0; i--) {
            const time = now - (i * 60 * 60 * 1000);
            const randomChange = (Math.random() - 0.5) * 2 * Math.abs(currentData.price.change_24h) / 24;
            const price = currentPrice * (1 + (randomChange / 100));
            
            history.push({
                time,
                value: price
            });
        }

        return history;
    } catch (error) {
        console.error('Error generating price history:', error);
        throw error;
    }
};

// Function to get token analysis data
export const getTokenAnalysis = async (contractAddress) => {
    try {
        const tokenData = await getTokenByContract(contractAddress);
        const priceHistory = await getPriceHistory(contractAddress);

        return {
            ...tokenData,
            chart: {
                prices: priceHistory
            }
        };
    } catch (error) {
        console.error('Token Analysis Error:', error);
        throw error;
    }
};

export default {
    getTokenByContract,
    getPriceHistory,
    getTokenAnalysis
};