// Pattern definitions for recognition
const PATTERNS = {
    DOUBLE_BOTTOM: {
        name: 'Double Bottom',
        bullish: true,
        confidence: 0,
        description: 'A reversal pattern that indicates a potential trend change from bearish to bullish.'
    },
    DOUBLE_TOP: {
        name: 'Double Top',
        bullish: false,
        confidence: 0,
        description: 'A reversal pattern that indicates a potential trend change from bullish to bearish.'
    },
    HEAD_AND_SHOULDERS: {
        name: 'Head and Shoulders',
        bullish: false,
        confidence: 0,
        description: 'A reversal pattern indicating a potential trend change from bullish to bearish.'
    },
    INVERSE_HEAD_AND_SHOULDERS: {
        name: 'Inverse Head and Shoulders',
        bullish: true,
        confidence: 0,
        description: 'A reversal pattern indicating a potential trend change from bearish to bullish.'
    }
};

// Technical indicators calculation with safety checks
const calculateIndicators = (data) => {
    // Ensure data exists and has required properties
    if (!data || !data.price || !Array.isArray(data.chart?.prices)) {
        return {
            sma: { sma20: [], sma50: [], sma200: [] },
            rsi: [],
            macd: { macdLine: [], signalLine: [], histogram: [] }
        };
    }

    const prices = data.chart.prices.map(p => p.value);
    if (!prices.length) {
        return {
            sma: { sma20: [], sma50: [], sma200: [] },
            rsi: [],
            macd: { macdLine: [], signalLine: [], histogram: [] }
        };
    }
    
    // Calculate multiple SMAs
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    const sma200 = calculateSMA(prices, 200);

    // Calculate RSI
    const rsi = calculateRSI(prices, 14);

    // Calculate MACD
    const macd = calculateMACD(prices);

    return {
        sma: { sma20, sma50, sma200 },
        rsi,
        macd
    };
};

// Calculate RSI with safety checks
const calculateRSI = (data, period = 14) => {
    if (!Array.isArray(data) || data.length < period + 1) {
        return Array(data?.length || 0).fill(50);
    }

    const changes = data.slice(1).map((value, index) => value - data[index]);
    const gains = changes.map(change => change > 0 ? change : 0);
    const losses = changes.map(change => change < 0 ? -change : 0);

    const avgGain = calculateSMA(gains, period);
    const avgLoss = calculateSMA(losses, period);

    return avgGain.map((gain, i) => {
        const rs = gain / (avgLoss[i] || 0.01);
        return 100 - (100 / (1 + rs));
    });
};

// Calculate MACD with safety checks
const calculateMACD = (data) => {
    if (!Array.isArray(data) || data.length < 26) {
        return {
            macdLine: Array(data?.length || 0).fill(0),
            signalLine: Array(data?.length || 0).fill(0),
            histogram: Array(data?.length || 0).fill(0)
        };
    }

    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    const macdLine = ema12.map((value, i) => value - ema26[i]);
    const signalLine = calculateEMA(macdLine, 9);
    
    return {
        macdLine,
        signalLine,
        histogram: macdLine.map((value, i) => value - signalLine[i])
    };
};

// Calculate EMA with safety checks
const calculateEMA = (data, period) => {
    if (!Array.isArray(data) || data.length < period) {
        return Array(data?.length || 0).fill(0);
    }

    const multiplier = 2 / (period + 1);
    const ema = [data[0]];
    
    for (let i = 1; i < data.length; i++) {
        ema.push((data[i] - ema[i-1]) * multiplier + ema[i-1]);
    }
    
    return ema;
};

// Enhanced pattern detection with safety checks
const analyzePricePatterns = (data, timeframe = '1h') => {
    if (!data || !data.chart?.prices || data.chart.prices.length < 50) {
        return [];
    }

    const patterns = [];
    const values = data.chart.prices.map(p => p.value);
    
    // Find local minimums and maximums with dynamic range based on timeframe
    const findExtremes = (data, timeframe) => {
        const rangeMap = { '1h': 10, '4h': 20, '1d': 40 };
        const range = rangeMap[timeframe] || 10;
        
        const extremes = [];
        for (let i = range; i < data.length - range; i++) {
            const window = data.slice(i - range, i + range + 1);
            const current = data[i];
            
            if (current === Math.min(...window)) {
                extremes.push({ index: i, type: 'min', value: current });
            }
            if (current === Math.max(...window)) {
                extremes.push({ index: i, type: 'max', value: current });
            }
        }
        return extremes;
    };

    const extremes = findExtremes(values, timeframe);

    // Pattern detection functions with safety checks
    const findDoubleBottom = () => {
        const bottoms = extremes.filter(e => e.type === 'min');
        for (let i = 0; i < bottoms.length - 1; i++) {
            const first = bottoms[i];
            const second = bottoms[i + 1];
            
            const priceDiff = Math.abs(first.value - second.value) / first.value;
            const timeDiff = second.index - first.index;
            
            if (priceDiff < 0.02 && timeDiff > 20) {
                const pattern = { ...PATTERNS.DOUBLE_BOTTOM };
                pattern.confidence = (1 - priceDiff) * 100;
                pattern.start = data.chart.prices[first.index].time;
                pattern.end = data.chart.prices[second.index].time;
                patterns.push(pattern);
            }
        }
    };

    // Add triangle pattern detection
    const findTrianglePatterns = () => {
        const peaks = extremes.filter(e => e.type === 'max');
        const troughs = extremes.filter(e => e.type === 'min');
        
        if (peaks.length < 3 || troughs.length < 3) return;

        for (let i = 0; i < peaks.length - 2; i++) {
            const highs = peaks.slice(i, i + 3).map(p => p.value);
            const lows = troughs.slice(i, i + 3).map(p => p.value);
            
            // Check for ascending triangle
            if (Math.abs(highs[0] - highs[1]) < highs[0] * 0.02 && 
                lows[1] > lows[0] && lows[2] > lows[1]) {
                const pattern = { ...PATTERNS.ASCENDING_TRIANGLE };
                pattern.confidence = 80;
                pattern.start = data.chart.prices[peaks[i].index].time;
                pattern.end = data.chart.prices[peaks[i + 2].index].time;
                patterns.push(pattern);
            }
        }
    };

    findDoubleBottom();
    findTrianglePatterns();

    return patterns;
};

// Enhanced trend strength analysis with safety checks
const analyzeTrendStrength = (data) => {
    if (!data || !data.chart?.prices || data.chart.prices.length < 20) {
        return {
            strength: 0,
            direction: 'neutral',
            confidence: 0,
            indicators: {
                rsi: 50,
                macd: 0,
                sma: 0
            }
        };
    }

    const indicators = calculateIndicators(data);
    const values = data.chart.prices.map(p => p.value);
    
    // Calculate trend strength using multiple factors
    const smaStrength = ((values[values.length - 1] - indicators.sma.sma20[indicators.sma.sma20.length - 1]) / 
                        (indicators.sma.sma20[indicators.sma.sma20.length - 1] || 1)) * 100;
    
    const rsiStrength = indicators.rsi[indicators.rsi.length - 1];
    const macdStrength = indicators.macd.histogram[indicators.macd.histogram.length - 1];

    // Combine multiple indicators for trend strength
    const trendStrength = (smaStrength * 0.4) + 
                         ((rsiStrength - 50) * 0.3) + 
                         (macdStrength * 100 * 0.3);

    return {
        strength: Math.abs(trendStrength),
        direction: trendStrength > 0 ? 'bullish' : 'bearish',
        confidence: Math.min(Math.abs(trendStrength) * 2, 100),
        indicators: {
            rsi: rsiStrength,
            macd: macdStrength,
            sma: smaStrength
        }
    };
};

// Calculate Simple Moving Average with safety checks
const calculateSMA = (data, period) => {
    if (!Array.isArray(data) || data.length < period) {
        return Array(data?.length || 0).fill(0);
    }

    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
    }
    return sma;
};

// Enhanced main analysis function with safety checks
export const analyzeMarketData = (data, timeframe = '1h') => {
    if (!data) {
        return {
            patterns: [],
            trend: {
                strength: 0,
                direction: 'neutral',
                confidence: 0,
                indicators: { rsi: 50, macd: 0, sma: 0 }
            },
            indicators: {
                sma: { sma20: [], sma50: [], sma200: [] },
                rsi: [],
                macd: { macdLine: [], signalLine: [], histogram: [] }
            },
            insights: [{
                type: 'general',
                name: 'Basic Analysis',
                confidence: 50,
                message: 'Insufficient data for detailed analysis',
                bullish: false
            }],
            timeframe,
            timestamp: Date.now()
        };
    }
    
    const patterns = analyzePricePatterns(data, timeframe);
    const trend = analyzeTrendStrength(data);
    const indicators = calculateIndicators(data);

    // Generate enhanced AI insights
    const insights = [];

    // Pattern-based insights
    patterns.forEach(pattern => {
        insights.push({
            type: 'pattern',
            name: pattern.name,
            confidence: pattern.confidence,
            message: `Detected ${pattern.name} pattern with ${pattern.confidence.toFixed(1)}% confidence`,
            bullish: pattern.bullish
        });
    });

    // Trend-based insights
    insights.push({
        type: 'trend',
        name: `${trend.direction.toUpperCase()} Trend`,
        confidence: trend.confidence,
        message: `${trend.direction.toUpperCase()} trend with strength of ${trend.strength.toFixed(1)}%`,
        bullish: trend.direction === 'bullish'
    });

    return {
        patterns,
        trend,
        indicators,
        insights,
        timeframe,
        timestamp: Date.now()
    };
};

export default {
    analyzeMarketData,
    PATTERNS,
    calculateIndicators
};