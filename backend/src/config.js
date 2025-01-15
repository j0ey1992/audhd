import dotenv from 'dotenv';

dotenv.config();

export const config = {
    // Server configuration
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Firebase configuration
    firebase: {
        serviceAccount: {
            type: 'service_account',
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
        },
        databaseURL: process.env.FIREBASE_DATABASE_URL
    },
    
    // Current API keys
    geminiApiKey: process.env.GEMINI_API_KEY,
    
    // Market Data APIs
    marketData: {
        coingecko: {
            apiKey: process.env.COINGECKO_API_KEY,
            baseUrl: 'https://api.coingecko.com/api/v3',
            rateLimit: 50 // calls per minute
        },
        coinmarketcap: {
            apiKey: process.env.COINMARKETCAP_API_KEY,
            baseUrl: 'https://pro-api.coinmarketcap.com/v2',
            rateLimit: 30
        },
        defillama: {
            apiKey: process.env.DEFILLAMA_API_KEY,
            baseUrl: 'https://api.llama.fi',
            rateLimit: 60
        }
    },

    // Social APIs
    social: {
        twitter: {
            apiKey: process.env.TWITTER_API_KEY,
            apiSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
            baseUrl: 'https://api.twitter.com/2'
        },
        telegram: {
            botToken: process.env.TELEGRAM_BOT_TOKEN,
            baseUrl: 'https://api.telegram.org'
        },
        reddit: {
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            username: process.env.REDDIT_USERNAME,
            password: process.env.REDDIT_PASSWORD,
            baseUrl: 'https://oauth.reddit.com'
        }
    },

    // Technical Analysis APIs
    technicalAnalysis: {
        tradingview: {
            apiKey: process.env.TRADINGVIEW_API_KEY,
            baseUrl: 'https://scanner.tradingview.com'
        },
        taapi: {
            apiKey: process.env.TAAPI_API_KEY,
            baseUrl: 'https://api.taapi.io',
            rateLimit: 60
        },
        cryptocompare: {
            apiKey: process.env.CRYPTOCOMPARE_API_KEY,
            baseUrl: 'https://min-api.cryptocompare.com/data',
            rateLimit: 100
        }
    },

    // News and Events APIs
    news: {
        cryptopanic: {
            apiKey: process.env.CRYPTOPANIC_API_KEY,
            baseUrl: 'https://cryptopanic.com/api/v1',
            rateLimit: 30
        },
        messari: {
            apiKey: process.env.MESSARI_API_KEY,
            baseUrl: 'https://data.messari.io/api',
            rateLimit: 20
        },
        santiment: {
            apiKey: process.env.SANTIMENT_API_KEY,
            baseUrl: 'https://api.santiment.net/graphql',
            rateLimit: 10
        }
    },

    // Cache configuration
    cache: {
        defaultTTL: 300, // 5 minutes in seconds
        checkPeriod: 600, // 10 minutes in seconds
    },
    
    // CORS configuration
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    
    // Rate limiting
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.RATE_LIMIT_MAX) || 100 // limit each IP to 100 requests per windowMs
    },

    // Email configuration
    email: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },

    // Push notifications
    push: {
        fcmServerKey: process.env.FCM_SERVER_KEY
    },

    // Trusted IPs
    trustedIps: process.env.TRUSTED_IPS?.split(',') || []
};

export default config;