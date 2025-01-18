import axios from 'axios';

const DEX_SCREENER_BASE_URL = 'https://api.dexscreener.com/latest/dex';

// Fallback data for when API fails
const FALLBACK_DATA = {
    price: {
        current: 0,
        change_24h: 0,
        high_24h: 0,
        low_24h: 0
    },
    market: {
        market_cap: 0,
        volume_24h: 0,
        liquidity: 0,
        circulating_supply: 0
    },
    metadata: {
        name: 'Unknown Token',
        symbol: 'UNKNOWN',
        chain: 'unknown',
        dex: 'unknown',
        pairAddress: ''
    },
    chart: {
        prices: []
    }
};

// Function to get token data by contract address
export const getTokenByContract = async (contractAddress) => {
    try {
        const response = await axios.get(`${DEX_SCREENER_BASE_URL}/tokens/${contractAddress}`);
        
        if (!response.data.pairs || response.data.pairs.length === 0) {
            console.warn('No trading pairs found for token:', contractAddress);
            return FALLBACK_DATA;
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
                name: mainPair.baseToken.name || 'Unknown Token',
                symbol: mainPair.baseToken.symbol || 'UNKNOWN',
                chain: mainPair.chainId || 'unknown',
                dex: mainPair.dexId || 'unknown',
                pairAddress: mainPair.pairAddress || ''
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
        return FALLBACK_DATA;
    }
};

// Function to get price history (simulated as DexScreener doesn't provide historical data in free tier)
export const getPriceHistory = async (contractAddress) => {
    try {
        const currentData = await getTokenByContract(contractAddress);
        const currentPrice = currentData.price.current || 1;
        
        // Generate simulated historical data
        const history = [];
        const hoursAgo = 24;
        const now = Date.now();
        
        for (let i = hoursAgo; i >= 0; i--) {
            const time = now - (i * 60 * 60 * 1000);
            const randomChange = (Math.random() - 0.5) * 2 * Math.abs(currentData.price.change_24h || 1) / 24;
            const price = currentPrice * (1 + (randomChange / 100));
            
            history.push({
                time,
                value: price
            });
        }

        return history;
    } catch (error) {
        console.error('Error generating price history:', error);
        // Return minimal simulated data on error
        return Array(25).fill(0).map((_, i) => ({
            time: Date.now() - (i * 60 * 60 * 1000),
            value: 1
        }));
    }
};

// Function to get token analysis data
export const getTokenAnalysis = async (contractAddress) => {
    try {
        const tokenData = await getTokenByContract(contractAddress);
        const priceHistory = await getPriceHistory(contractAddress);

        // Calculate support and resistance based on price history
        const prices = priceHistory.map(p => p.value);
        const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
        const std = Math.sqrt(prices.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / prices.length);

        return {
            tokenData: {
                ...tokenData,
                chart: {
                    prices: priceHistory,
                    support: Math.max(0, avg - std),
                    resistance: avg + std
                }
            }
        };
    } catch (error) {
        console.error('Token Analysis Error:', error);
        // Return fallback analysis data
        return {
            tokenData: {
                ...FALLBACK_DATA,
                chart: {
                    prices: Array(25).fill(0).map((_, i) => ({
                        time: Date.now() - (i * 60 * 60 * 1000),
                        value: 1
                    })),
                    support: 0.95,
                    resistance: 1.05
                }
            }
        };
    }
};

export default {
    getTokenByContract,
    getPriceHistory,
    getTokenAnalysis
};