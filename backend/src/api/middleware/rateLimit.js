import rateLimit from 'express-rate-limit';
import { config } from '../../config.js';

/**
 * Rate limiting middleware
 * Limits the number of requests from an IP within a time window
 */
export const rateLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
        error: 'Too Many Requests',
        message: 'You have exceeded the rate limit. Please try again later.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Skip rate limiting for trusted IPs (optional)
    skip: (req) => {
        const trustedIps = process.env.TRUSTED_IPS?.split(',') || [];
        return trustedIps.includes(req.ip);
    }
});

/**
 * Stricter rate limiting for sensitive endpoints
 */
export const strictRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: {
        error: 'Too Many Requests',
        message: 'Too many attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});