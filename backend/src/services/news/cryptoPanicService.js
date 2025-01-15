import axios from 'axios';
import { config } from '../../config.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache for news data
const API_BASE_URL = config.news.cryptopanic.baseUrl;
const API_KEY = config.news.cryptopanic.apiKey;

// News filter types
const FILTER_TYPES = {
    RISING: 'rising',
    HOT: 'hot',
    IMPORTANT: 'important'
};

// News categories
const CATEGORIES = {
    GENERAL: 'general',
    ANALYSIS: 'analysis',
    BLOCKCHAIN: 'blockchain',
    TECHNOLOGY: 'technology',
    MINING: 'mining',
    EXCHANGE: 'exchange',
    REGULATION: 'regulation',
    SCAM: 'scam'
};

/**
 * Format news data
 */
const formatNewsData = (news) => {
    return news.map(item => ({
        id: item.id,
        title: item.title,
        published_at: new Date(item.published_at),
        url: item.url,
        source: {
            name: item.source.title,
            domain: item.source.domain,
            path: item.source.path
        },
        currencies: item.currencies?.map(currency => ({
            code: currency.code,
            title: currency.title,
            slug: currency.slug,
            url: currency.url
        })) || [],
        metadata: {
            votes: {
                positive: item.votes?.positive || 0,
                negative: item.votes?.negative || 0,
                important: item.votes?.important || 0,
                liked: item.votes?.liked || 0,
                disliked: item.votes?.disliked || 0
            },
            type: item.kind,
            domain: item.domain,
            similarity: item.similarity || 0
        }
    }));
};

/**
 * Get latest news
 */
export const getLatestNews = async (options = {}) => {
    try {
        const {
            filter = FILTER_TYPES.HOT,
            currencies = null,
            regions = null,
            categories = null,
            limit = 50
        } = options;

        // Check cache
        const cacheKey = `cryptopanic_${filter}_${currencies}_${regions}_${categories}_${limit}`;
        const cached = await getDocument(COLLECTIONS.NEWS_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from CryptoPanic
        const response = await axios.get(`${API_BASE_URL}/posts`, {
            params: {
                auth_token: API_KEY,
                filter: filter,
                currencies: currencies,
                regions: regions,
                kind: categories,
                limit: limit,
                public: true
            }
        });

        const news = formatNewsData(response.data.results);

        // Cache result
        await addDocument(COLLECTIONS.NEWS_CACHE, {
            data: news,
            timestamp: Date.now()
        }, cacheKey);

        return news;
    } catch (error) {
        console.error('Error fetching latest news:', error);
        throw new Error(`Failed to fetch latest news: ${error.message}`);
    }
};

/**
 * Get token-specific news
 */
export const getTokenNews = async (currency, options = {}) => {
    try {
        const {
            filter = FILTER_TYPES.HOT,
            categories = null,
            limit = 50
        } = options;

        // Check cache
        const cacheKey = `cryptopanic_token_${currency}_${filter}_${categories}_${limit}`;
        const cached = await getDocument(COLLECTIONS.NEWS_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from CryptoPanic
        const response = await axios.get(`${API_BASE_URL}/posts`, {
            params: {
                auth_token: API_KEY,
                currencies: currency,
                filter: filter,
                kind: categories,
                limit: limit,
                public: true
            }
        });

        const news = formatNewsData(response.data.results);

        // Cache result
        await addDocument(COLLECTIONS.NEWS_CACHE, {
            data: news,
            timestamp: Date.now()
        }, cacheKey);

        return news;
    } catch (error) {
        console.error('Error fetching token news:', error);
        throw new Error(`Failed to fetch token news: ${error.message}`);
    }
};

/**
 * Get trending news by category
 */
export const getTrendingNews = async (category = CATEGORIES.GENERAL, limit = 10) => {
    try {
        // Check cache
        const cacheKey = `cryptopanic_trending_${category}_${limit}`;
        const cached = await getDocument(COLLECTIONS.NEWS_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from CryptoPanic
        const response = await axios.get(`${API_BASE_URL}/posts`, {
            params: {
                auth_token: API_KEY,
                filter: FILTER_TYPES.RISING,
                kind: category,
                limit: limit,
                public: true
            }
        });

        const news = formatNewsData(response.data.results);

        // Cache result
        await addDocument(COLLECTIONS.NEWS_CACHE, {
            data: news,
            timestamp: Date.now()
        }, cacheKey);

        return news;
    } catch (error) {
        console.error('Error fetching trending news:', error);
        throw new Error(`Failed to fetch trending news: ${error.message}`);
    }
};

/**
 * Search news
 */
export const searchNews = async (query, options = {}) => {
    try {
        const {
            filter = FILTER_TYPES.HOT,
            currencies = null,
            categories = null,
            limit = 50
        } = options;

        // Check cache
        const cacheKey = `cryptopanic_search_${query}_${filter}_${currencies}_${categories}_${limit}`;
        const cached = await getDocument(COLLECTIONS.NEWS_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from CryptoPanic
        const response = await axios.get(`${API_BASE_URL}/posts`, {
            params: {
                auth_token: API_KEY,
                filter: filter,
                currencies: currencies,
                kind: categories,
                limit: limit,
                public: true,
                q: query
            }
        });

        const news = formatNewsData(response.data.results);

        // Cache result
        await addDocument(COLLECTIONS.NEWS_CACHE, {
            data: news,
            timestamp: Date.now()
        }, cacheKey);

        return news;
    } catch (error) {
        console.error('Error searching news:', error);
        throw new Error(`Failed to search news: ${error.message}`);
    }
};

export default {
    getLatestNews,
    getTokenNews,
    getTrendingNews,
    searchNews,
    FILTER_TYPES,
    CATEGORIES
};