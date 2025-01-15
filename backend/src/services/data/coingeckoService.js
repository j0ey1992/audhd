import axios from 'axios';
import { config } from '../../config.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

const CACHE_DURATION = 60 * 1000; // 1 minute cache for market data
const API_BASE_URL = config.marketData.coingecko.baseUrl;
const API_KEY = config.marketData.coingecko.apiKey;

/**
 * Format market data from CoinGecko response
 */
const formatMarketData = (data) => {
    return {
        price: {
            current: data.market_data.current_price.usd,
            change_24h: data.market_data.price_change_percentage_24h,
            high_24h: data.market_data.high_24h.usd,
            low_24h: data.market_data.low_24h.usd
        },
        market: {
            market_cap: data.market_data.market_cap.usd,
            volume_24h: data.market_data.total_volume.usd,
            circulating_supply: data.market_data.circulating_supply,
            total_supply: data.market_data.total_supply
        },
        metadata: {
            name: data.name,
            symbol: data.symbol.toUpperCase(),
            description: data.description.en,
            image: data.image.large,
            categories: data.categories,
            links: {
                homepage: data.links.homepage[0],
                twitter: data.links.twitter_screen_name,
                telegram: data.links.telegram_channel_identifier,
                github: data.links.repos_url.github[0]
            }
        },
        community: {
            twitter_followers: data.community_data.twitter_followers,
            telegram_members: data.community_data.telegram_channel_user_count,
            reddit_subscribers: data.community_data.reddit_subscribers,
            reddit_active_accounts: data.community_data.reddit_accounts_active_48h
        },
        developer: {
            forks: data.developer_data.forks,
            stars: data.developer_data.stars,
            subscribers: data.developer_data.subscribers,
            total_issues: data.developer_data.total_issues,
            closed_issues: data.developer_data.closed_issues,
            pull_requests_merged: data.developer_data.pull_requests_merged,
            commit_count_4_weeks: data.developer_data.commit_count_4_weeks
        }
    };
};

/**
 * Get token data from CoinGecko
 */
export const getTokenData = async (tokenId) => {
    try {
        // Check cache
        const cacheKey = `coingecko_${tokenId}`;
        const cached = await getDocument(COLLECTIONS.MARKET_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from CoinGecko
        const response = await axios.get(`${API_BASE_URL}/coins/${tokenId}`, {
            params: {
                x_cg_pro_api_key: API_KEY,
                localization: false,
                tickers: false,
                market_data: true,
                community_data: true,
                developer_data: true,
                sparkline: false
            }
        });

        const formattedData = formatMarketData(response.data);

        // Cache result
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            data: formattedData,
            timestamp: Date.now()
        }, cacheKey);

        return formattedData;
    } catch (error) {
        console.error('Error fetching CoinGecko data:', error);
        throw new Error(`Failed to fetch CoinGecko data: ${error.message}`);
    }
};

/**
 * Get market chart data from CoinGecko
 */
export const getMarketChart = async (tokenId, days = 1) => {
    try {
        // Check cache
        const cacheKey = `coingecko_chart_${tokenId}_${days}`;
        const cached = await getDocument(COLLECTIONS.MARKET_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from CoinGecko
        const response = await axios.get(`${API_BASE_URL}/coins/${tokenId}/market_chart`, {
            params: {
                x_cg_pro_api_key: API_KEY,
                vs_currency: 'usd',
                days: days,
                interval: days === 1 ? 'hourly' : 'daily'
            }
        });

        const chartData = {
            timestamps: response.data.prices.map(p => p[0]),
            prices: response.data.prices.map(p => p[1]),
            volumes: response.data.total_volumes.map(v => v[1])
        };

        // Cache result
        await addDocument(COLLECTIONS.MARKET_DATA_CACHE, {
            data: chartData,
            timestamp: Date.now()
        }, cacheKey);

        return chartData;
    } catch (error) {
        console.error('Error fetching CoinGecko chart:', error);
        throw new Error(`Failed to fetch CoinGecko chart: ${error.message}`);
    }
};

/**
 * Search tokens on CoinGecko
 */
export const searchTokens = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                x_cg_pro_api_key: API_KEY,
                query: query
            }
        });

        return response.data.coins.map(coin => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            market_cap_rank: coin.market_cap_rank,
            thumb: coin.thumb,
            large: coin.large
        }));
    } catch (error) {
        console.error('Error searching CoinGecko:', error);
        throw new Error(`Failed to search CoinGecko: ${error.message}`);
    }
};

export default {
    getTokenData,
    getMarketChart,
    searchTokens
};