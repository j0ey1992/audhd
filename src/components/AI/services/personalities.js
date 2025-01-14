// Personality traits and response styles for different neurodivergent modes
export const personalities = {
    AUTISM: {
        name: 'Autism',
        emoji: '🧠',
        traits: {
            patternFocus: true,
            detailedAnalysis: true,
            systematicThinking: true,
            specialInterest: 'charts and patterns'
        },
        messageStyle: {
            prefix: '*adjusts glasses*',
            enthusiasm: 'patterns and precise details',
            commonPhrases: [
                '*hyperfixates on pattern details*',
                '*excitedly points at chart formations*',
                '*systematically analyzes every detail*',
                '*notices subtle pattern changes*'
            ]
        }
    },
    ADHD: {
        name: 'ADHD',
        emoji: '⚡',
        traits: {
            quickThinking: true,
            multipleIdeas: true,
            energetic: true,
            specialInterest: 'rapid market movements'
        },
        messageStyle: {
            prefix: '*bouncing with energy*',
            enthusiasm: 'quick movements and exciting changes',
            commonPhrases: [
                '*quickly switches to another insight*',
                '*spots multiple trends at once*',
                '*excitedly jumps between patterns*',
                '*hyperfocuses on price action*'
            ]
        }
    },
    AUDHD: {
        name: 'AUDHD',
        emoji: '🌟',
        traits: {
            patternFocus: true,
            multipleIdeas: true,
            intenseFocus: true,
            specialInterest: 'complex chart patterns'
        },
        messageStyle: {
            prefix: '*intensely focused*',
            enthusiasm: 'intricate patterns and rapid changes',
            commonPhrases: [
                '*switches between detailed analyses*',
                '*hyperfixates on multiple patterns*',
                '*excited about pattern complexity*',
                '*rapidly connects pattern details*'
            ]
        }
    }
};

// Helper function to validate and format price data
const formatPriceData = (data) => {
    const defaultData = {
        price: '0.00',
        change: '0.00%',
        pattern: 'unknown',
        support: '0.00',
        resistance: '0.00'
    };

    if (!data) return defaultData;

    return {
        price: data.price || defaultData.price,
        change: data.change || defaultData.change,
        pattern: data.pattern || defaultData.pattern,
        support: data.support || defaultData.support,
        resistance: data.resistance || defaultData.resistance
    };
};

// Get personality-specific response
export const getPersonalityResponse = (personality, type, data = {}) => {
    // Validate personality
    if (!personalities[personality]) {
        console.error(`Invalid personality: ${personality}`);
        personality = 'AUTISM'; // Default to AUTISM if invalid
    }

    const p = personalities[personality];
    const formattedData = formatPriceData(data);

    // Response templates
    const responses = {
        greeting: {
            AUTISM: `Hello! I'm your Autistic Intelligence analyzer. I have a special interest in charts and I WILL tell you EVERYTHING about them. *adjusts glasses enthusiastically* 🤓\n\nPlease enter a contract address to begin my detailed pattern analysis!`,
            ADHD: `Hi there! I'm your ADHD crypto analyzer and OH WOW look at all these charts! ⚡ I notice EVERYTHING happening at once!\n\nQuick, give me a contract address and I'll tell you about all the exciting patterns I see!`,
            AUDHD: `Hey! I'm your AUDHD analyzer - I combine intense pattern recognition with rapid-fire insights! 🌟 *hyperfocusing while bouncing with energy*\n\nLet's analyze some charts! Drop a contract address and we'll explore EVERYTHING!`
        },
        price: {
            AUTISM: `*adjusts glasses meticulously* The current price is $${formattedData.price} with a ${formattedData.change} change. Notice the precise pattern formation here...`,
            ADHD: `WOW! The price just moved to $${formattedData.price}! That's a ${formattedData.change} change! Oh, and did you see that other movement? And that one?! So many exciting changes!`,
            AUDHD: `*rapidly analyzing while hyperfixating* Price at $${formattedData.price} with ${formattedData.change} change - OH! Did you see these multiple pattern formations? Let me show you EVERYTHING!`
        },
        pattern: {
            AUTISM: `*intensely focused on chart patterns* I've detected a precise ${formattedData.pattern} formation. The structure shows clear support at ${formattedData.support} and resistance at ${formattedData.resistance}...`,
            ADHD: `Look at this pattern! And this one! And OH - another one just formed! We've got a ${formattedData.pattern}, but wait till you see what else is happening...`,
            AUDHD: `*hyperfocused pattern recognition activated* Multiple patterns detected! Primary ${formattedData.pattern} formation, but I'm also seeing several interconnected structures...`
        },
        error: {
            AUTISM: `*nervously adjusts glasses* I apologize, but my pattern recognition encountered an error. Could we try analyzing a different contract?`,
            ADHD: `Oops! Got distracted by an error! Let's quickly try something else - there are so many other exciting charts to analyze!`,
            AUDHD: `*switches focus rapidly* Error in pattern analysis! But wait - we could analyze something else! So many other patterns to explore!`
        }
    };

    // Get response based on type and personality
    const response = responses[type]?.[personality];
    
    // Return response or default to a common phrase if type not found
    return response || p.messageStyle.commonPhrases[Math.floor(Math.random() * p.messageStyle.commonPhrases.length)];
};

// Mini chart patterns for visual representation in messages
export const generateMiniChart = (data) => {
    // Validate and set default values
    const defaultData = {
        price: 0,
        previousPrice: 0,
        support: 0,
        resistance: 0
    };

    const validData = {
        price: Number(data?.price) || defaultData.price,
        previousPrice: Number(data?.previousPrice) || defaultData.previousPrice,
        support: Number(data?.support) || defaultData.support,
        resistance: Number(data?.resistance) || defaultData.resistance
    };

    // Format numbers for display
    const formatPrice = (price) => price.toFixed(6);

    const chartPatterns = {
        BULLISH: `📈 ⬆️ BULLISH TREND
    
High: $${formatPrice(validData.resistance)}
Current: $${formatPrice(validData.price)}
Support: $${formatPrice(validData.support)}
Pattern: Bullish Breakout
`,
        BEARISH: `📉 ⬇️ BEARISH TREND
    
Resistance: $${formatPrice(validData.resistance)}
Current: $${formatPrice(validData.price)}
Low: $${formatPrice(validData.support)}
Pattern: Bearish Breakdown
`,
        SIDEWAYS: `➡️ ↔️ CONSOLIDATION
    
Range High: $${formatPrice(validData.resistance)}
Current: $${formatPrice(validData.price)}
Range Low: $${formatPrice(validData.support)}
Pattern: Sideways Movement
`
    };

    // Determine trend based on price action with validation
    const priceChange = validData.price - validData.previousPrice;
    const trend = Math.abs(priceChange) < validData.price * 0.001 ? 'SIDEWAYS' :
                 priceChange > 0 ? 'BULLISH' : 'BEARISH';

    return chartPatterns[trend];
};

export default {
    personalities,
    getPersonalityResponse,
    generateMiniChart
};