import axios from 'axios';
import { config } from '../../config.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache for social data
const API_BASE_URL = config.social.twitter.baseUrl;
const API_KEY = config.social.twitter.apiKey;
const API_SECRET = config.social.twitter.apiSecret;
const ACCESS_TOKEN = config.social.twitter.accessToken;
const ACCESS_SECRET = config.social.twitter.accessSecret;

// Sentiment thresholds
const SENTIMENT_THRESHOLDS = {
    VERY_POSITIVE: 0.6,
    POSITIVE: 0.2,
    NEUTRAL: -0.2,
    NEGATIVE: -0.6,
    VERY_NEGATIVE: -1.0
};

/**
 * Get bearer token for API authentication
 */
const getBearerToken = async () => {
    try {
        const response = await axios.post('https://api.twitter.com/oauth2/token', 
            'grant_type=client_credentials',
            {
                auth: {
                    username: API_KEY,
                    password: API_SECRET
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Twitter bearer token:', error);
        throw new Error(`Failed to get Twitter bearer token: ${error.message}`);
    }
};

/**
 * Format tweet data
 */
const formatTweetData = (tweets) => {
    return tweets.map(tweet => ({
        id: tweet.id,
        text: tweet.text,
        created_at: new Date(tweet.created_at),
        author: {
            id: tweet.author_id,
            username: tweet.author?.username,
            name: tweet.author?.name,
            followers_count: tweet.author?.public_metrics?.followers_count,
            verified: tweet.author?.verified
        },
        metrics: {
            retweets: tweet.public_metrics?.retweet_count || 0,
            replies: tweet.public_metrics?.reply_count || 0,
            likes: tweet.public_metrics?.like_count || 0,
            quotes: tweet.public_metrics?.quote_count || 0,
            impressions: tweet.public_metrics?.impression_count || 0
        },
        sentiment: calculateSentiment(tweet.text),
        entities: tweet.entities || {},
        referenced_tweets: tweet.referenced_tweets || [],
        lang: tweet.lang
    }));
};

/**
 * Calculate basic sentiment score (-1 to 1)
 * Note: This is a basic implementation. Consider using a more sophisticated
 * sentiment analysis service for production.
 */
const calculateSentiment = (text) => {
    const positiveWords = [
        'bullish', 'moon', 'pump', 'gain', 'profit', 'buy', 'long',
        'good', 'great', 'excellent', 'amazing', 'potential', 'growth'
    ];
    const negativeWords = [
        'bearish', 'dump', 'sell', 'short', 'loss', 'scam', 'rug',
        'bad', 'terrible', 'poor', 'avoid', 'risk', 'crash'
    ];

    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    let relevantWords = 0;

    words.forEach(word => {
        if (positiveWords.includes(word)) {
            score += 1;
            relevantWords++;
        } else if (negativeWords.includes(word)) {
            score -= 1;
            relevantWords++;
        }
    });

    return relevantWords > 0 ? score / relevantWords : 0;
};

/**
 * Get recent tweets about a token
 */
export const getTokenTweets = async (symbol, count = 100) => {
    try {
        // Check cache
        const cacheKey = `twitter_${symbol.toLowerCase()}_${count}`;
        const cached = await getDocument(COLLECTIONS.SOCIAL_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        const bearerToken = await getBearerToken();

        // Search for tweets
        const response = await axios.get(`${API_BASE_URL}/tweets/search/recent`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            },
            params: {
                'query': `${symbol} crypto -is:retweet lang:en`,
                'max_results': count,
                'tweet.fields': 'created_at,public_metrics,entities,referenced_tweets,lang',
                'user.fields': 'username,name,public_metrics,verified',
                'expansions': 'author_id'
            }
        });

        const tweets = formatTweetData(response.data.data);
        const analysis = analyzeTweetSentiment(tweets);

        const result = {
            tweets,
            analysis
        };

        // Cache result
        await addDocument(COLLECTIONS.SOCIAL_DATA_CACHE, {
            data: result,
            timestamp: Date.now()
        }, cacheKey);

        return result;
    } catch (error) {
        console.error('Error fetching token tweets:', error);
        throw new Error(`Failed to fetch token tweets: ${error.message}`);
    }
};

/**
 * Analyze tweet sentiment
 */
const analyzeTweetSentiment = (tweets) => {
    const totalTweets = tweets.length;
    if (totalTweets === 0) return null;

    // Calculate metrics
    const sentiments = tweets.map(t => t.sentiment);
    const averageSentiment = sentiments.reduce((a, b) => a + b, 0) / totalTweets;
    
    // Calculate distribution
    const distribution = {
        very_positive: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
        very_negative: 0
    };

    sentiments.forEach(sentiment => {
        if (sentiment >= SENTIMENT_THRESHOLDS.VERY_POSITIVE) {
            distribution.very_positive++;
        } else if (sentiment >= SENTIMENT_THRESHOLDS.POSITIVE) {
            distribution.positive++;
        } else if (sentiment >= SENTIMENT_THRESHOLDS.NEUTRAL) {
            distribution.neutral++;
        } else if (sentiment >= SENTIMENT_THRESHOLDS.NEGATIVE) {
            distribution.negative++;
        } else {
            distribution.very_negative++;
        }
    });

    // Calculate engagement metrics
    const engagement = tweets.reduce((acc, tweet) => ({
        total_retweets: acc.total_retweets + tweet.metrics.retweets,
        total_likes: acc.total_likes + tweet.metrics.likes,
        total_replies: acc.total_replies + tweet.metrics.replies,
        total_quotes: acc.total_quotes + tweet.metrics.quotes,
        total_impressions: acc.total_impressions + tweet.metrics.impressions
    }), {
        total_retweets: 0,
        total_likes: 0,
        total_replies: 0,
        total_quotes: 0,
        total_impressions: 0
    });

    return {
        sentiment_score: averageSentiment,
        sentiment_label: getSentimentLabel(averageSentiment),
        distribution: Object.fromEntries(
            Object.entries(distribution).map(([key, value]) => [
                key,
                (value / totalTweets) * 100
            ])
        ),
        engagement,
        total_tweets: totalTweets,
        timestamp: new Date()
    };
};

/**
 * Get sentiment label based on score
 */
const getSentimentLabel = (score) => {
    if (score >= SENTIMENT_THRESHOLDS.VERY_POSITIVE) return 'Very Positive';
    if (score >= SENTIMENT_THRESHOLDS.POSITIVE) return 'Positive';
    if (score >= SENTIMENT_THRESHOLDS.NEUTRAL) return 'Neutral';
    if (score >= SENTIMENT_THRESHOLDS.NEGATIVE) return 'Negative';
    return 'Very Negative';
};

/**
 * Get influential tweets about a token
 */
export const getInfluentialTweets = async (symbol, minFollowers = 10000, count = 50) => {
    try {
        // Check cache
        const cacheKey = `twitter_influential_${symbol.toLowerCase()}_${count}`;
        const cached = await getDocument(COLLECTIONS.SOCIAL_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        const bearerToken = await getBearerToken();

        // Search for tweets from influential users
        const response = await axios.get(`${API_BASE_URL}/tweets/search/recent`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            },
            params: {
                'query': `${symbol} crypto min_faves:100 -is:retweet lang:en`,
                'max_results': count,
                'tweet.fields': 'created_at,public_metrics,entities,referenced_tweets,lang',
                'user.fields': 'username,name,public_metrics,verified',
                'expansions': 'author_id'
            }
        });

        const tweets = formatTweetData(response.data.data)
            .filter(tweet => tweet.author.followers_count >= minFollowers)
            .sort((a, b) => b.metrics.likes - a.metrics.likes);

        // Cache result
        await addDocument(COLLECTIONS.SOCIAL_DATA_CACHE, {
            data: tweets,
            timestamp: Date.now()
        }, cacheKey);

        return tweets;
    } catch (error) {
        console.error('Error fetching influential tweets:', error);
        throw new Error(`Failed to fetch influential tweets: ${error.message}`);
    }
};

export default {
    getTokenTweets,
    getInfluentialTweets,
    SENTIMENT_THRESHOLDS
};