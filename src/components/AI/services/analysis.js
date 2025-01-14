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

// Analyze price movement patterns
const analyzePricePatterns = (prices) => {
    if (!prices || prices.length < 50) return [];

    const patterns = [];
    const values = prices.map(p => p.value);
    
    // Find local minimums and maximums
    const findExtremes = (data, range = 10) => {
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

    const extremes = findExtremes(values);

    // Double Bottom Detection
    const findDoubleBottom = () => {
        const bottoms = extremes.filter(e => e.type === 'min');
        for (let i = 0; i < bottoms.length - 1; i++) {
            const first = bottoms[i];
            const second = bottoms[i + 1];
            
            // Check if bottoms are at similar levels (within 2% difference)
            const priceDiff = Math.abs(first.value - second.value) / first.value;
            if (priceDiff < 0.02 && second.index - first.index > 20) {
                const pattern = { ...PATTERNS.DOUBLE_BOTTOM };
                pattern.confidence = (1 - priceDiff) * 100;
                pattern.start = prices[first.index].time;
                pattern.end = prices[second.index].time;
                patterns.push(pattern);
            }
        }
    };

    // Head and Shoulders Detection
    const findHeadAndShoulders = () => {
        const peaks = extremes.filter(e => e.type === 'max');
        for (let i = 0; i < peaks.length - 2; i++) {
            const leftShoulder = peaks[i];
            const head = peaks[i + 1];
            const rightShoulder = peaks[i + 2];
            
            // Check if head is higher than shoulders
            if (head.value > leftShoulder.value && 
                head.value > rightShoulder.value) {
                
                // Check if shoulders are at similar levels (within 5% difference)
                const shoulderDiff = Math.abs(leftShoulder.value - rightShoulder.value) / leftShoulder.value;
                if (shoulderDiff < 0.05) {
                    const pattern = { ...PATTERNS.HEAD_AND_SHOULDERS };
                    pattern.confidence = (1 - shoulderDiff) * 100;
                    pattern.start = prices[leftShoulder.index].time;
                    pattern.end = prices[rightShoulder.index].time;
                    patterns.push(pattern);
                }
            }
        }
    };

    findDoubleBottom();
    findHeadAndShoulders();

    return patterns;
};

// Analyze trend strength
const analyzeTrendStrength = (prices) => {
    if (!prices || prices.length < 20) return null;

    const values = prices.map(p => p.value);
    const sma20 = calculateSMA(values, 20);
    const lastSMA = sma20[sma20.length - 1];
    const currentPrice = values[values.length - 1];

    // Calculate trend strength based on price position relative to SMA
    const trendStrength = ((currentPrice - lastSMA) / lastSMA) * 100;

    return {
        strength: Math.abs(trendStrength),
        direction: trendStrength > 0 ? 'bullish' : 'bearish',
        confidence: Math.min(Math.abs(trendStrength) * 2, 100)
    };
};

// Calculate Simple Moving Average
const calculateSMA = (data, period) => {
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
    }
    return sma;
};

// Analyze volume patterns
const analyzeVolume = (volumes) => {
    if (!volumes || volumes.length < 20) return null;

    const values = volumes.map(v => v.value);
    const averageVolume = values.reduce((a, b) => a + b, 0) / values.length;
    const recentVolume = values[values.length - 1];

    return {
        volumeChange: ((recentVolume - averageVolume) / averageVolume) * 100,
        isHighVolume: recentVolume > averageVolume * 1.5,
        isLowVolume: recentVolume < averageVolume * 0.5
    };
};

// Main analysis function
export const analyzeMarketData = (marketData) => {
    if (!marketData) return null;

    const { prices, volumes } = marketData;
    
    const patterns = analyzePricePatterns(prices);
    const trend = analyzeTrendStrength(prices);
    const volume = analyzeVolume(volumes);

    // Generate AI insights
    const insights = [];

    // Pattern-based insights
    patterns.forEach(pattern => {
        insights.push({
            type: 'pattern',
            name: pattern.name,
            confidence: pattern.confidence,
            message: `Detected ${ pattern.name } pattern with ${ pattern.confidence.toFixed(1) }% confidence`,
            bullish: pattern.bullish
        });
    });

    // Trend-based insights
    if (trend) {
        insights.push({
            type: 'trend',
            name: `${trend.direction.toUpperCase()} Trend`,
            confidence: trend.confidence,
            message: `${trend.direction.toUpperCase()} trend with strength of ${trend.strength.toFixed(1)}%`,
            bullish: trend.direction === 'bullish'
        });
    }

    // Volume-based insights
    if (volume) {
        if (volume.isHighVolume) {
            insights.push({
                type: 'volume',
                name: 'High Volume Alert',
                confidence: 80,
                message: `Volume is ${volume.volumeChange.toFixed(1)}% above average`,
                bullish: volume.volumeChange > 0
            });
        }
    }

    return {
        patterns,
        trend,
        volume,
        insights,
        timestamp: Date.now()
    };
};

export default {
    analyzeMarketData,
    PATTERNS
};