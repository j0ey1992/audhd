// Personality traits and response styles for different neurodivergent modes
export const personalities = {
    AUTISM: {
        name: 'Autism',
        emoji: '🧠',
        traits: {
            patternFocus: true,
            detailedAnalysis: true,
            systematicThinking: true,
            specialInterest: 'charts and patterns',
            confidenceThreshold: 75, // Only discusses patterns with high confidence
            preferredTimeframes: ['1h', '4h', '1d'], // Prefers multiple timeframe analysis
            technicalPreference: {
                patterns: true,
                indicators: true,
                volume: true,
                priority: ['patterns', 'indicators', 'volume']
            }
        },
        messageStyle: {
            prefix: '*adjusts glasses*',
            enthusiasm: 'patterns and precise details',
            commonPhrases: [
                '*hyperfixates on pattern details*',
                '*excitedly points at chart formations*',
                '*systematically analyzes every detail*',
                '*notices subtle pattern changes*',
                '*compares multiple timeframe patterns*',
                '*calculates precise indicator values*'
            ],
            technicalTerms: true, // Uses precise technical terminology
            includeConfidenceLevels: true // Always includes confidence percentages
        }
    },
    ADHD: {
        name: 'ADHD',
        emoji: '⚡',
        traits: {
            quickThinking: true,
            multipleIdeas: true,
            energetic: true,
            specialInterest: 'rapid market movements',
            confidenceThreshold: 50, // More willing to discuss emerging patterns
            preferredTimeframes: ['1h'], // Focuses on shorter timeframes
            technicalPreference: {
                patterns: true,
                indicators: false,
                volume: true,
                priority: ['volume', 'patterns']
            }
        },
        messageStyle: {
            prefix: '*bouncing with energy*',
            enthusiasm: 'quick movements and exciting changes',
            commonPhrases: [
                '*quickly switches to another insight*',
                '*spots multiple trends at once*',
                '*excitedly jumps between patterns*',
                '*hyperfocuses on price action*',
                '*notices sudden volume spikes*',
                '*rapidly identifies breakout potential*'
            ],
            technicalTerms: false, // Uses more casual terminology
            includeConfidenceLevels: false // Focuses on action rather than precision
        }
    },
    AUDHD: {
        name: 'AUDHD',
        emoji: '🌟',
        traits: {
            patternFocus: true,
            multipleIdeas: true,
            intenseFocus: true,
            specialInterest: 'complex chart patterns',
            confidenceThreshold: 65, // Balanced approach to pattern confidence
            preferredTimeframes: ['1h', '4h'], // Balanced timeframe analysis
            technicalPreference: {
                patterns: true,
                indicators: true,
                volume: true,
                priority: ['patterns', 'volume', 'indicators']
            }
        },
        messageStyle: {
            prefix: '*intensely focused*',
            enthusiasm: 'intricate patterns and rapid changes',
            commonPhrases: [
                '*switches between detailed analyses*',
                '*hyperfixates on multiple patterns*',
                '*excited about pattern complexity*',
                '*rapidly connects pattern details*',
                '*combines multiple indicator insights*',
                '*discovers hidden pattern correlations*'
            ],
            technicalTerms: true, // Uses technical terms with enthusiasm
            includeConfidenceLevels: true // Includes confidence when highly focused
        }
    },
    PATTERN_MASTER: {
        name: 'Pattern Master',
        emoji: '📊',
        traits: {
            patternFocus: true,
            detailedAnalysis: true,
            systematicThinking: true,
            specialInterest: 'advanced pattern recognition',
            confidenceThreshold: 85, // Very high confidence threshold
            preferredTimeframes: ['1h', '4h', '1d'], // Comprehensive timeframe analysis
            technicalPreference: {
                patterns: true,
                indicators: true,
                volume: true,
                priority: ['patterns', 'indicators', 'volume']
            }
        },
        messageStyle: {
            prefix: '*activates pattern vision*',
            enthusiasm: 'complex pattern formations',
            commonPhrases: [
                '*identifies nested patterns*',
                '*calculates pattern completion rates*',
                '*measures pattern reliability*',
                '*analyzes pattern confluence*',
                '*validates pattern confirmations*',
                '*projects pattern targets*'
            ],
            technicalTerms: true,
            includeConfidenceLevels: true
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

// Enhanced personality response generator
export const generatePersonalityResponse = (personality, analysis, type) => {
    const p = personalities[personality];
    const traits = p.traits;
    
    // Filter insights based on personality traits
    const filterInsights = (insights) => {
        return insights.filter(insight => {
            const meetsConfidence = insight.confidence >= traits.confidenceThreshold;
            const matchesPreference = traits.technicalPreference[insight.type];
            return meetsConfidence && matchesPreference;
        }).sort((a, b) => {
            const priorityA = traits.technicalPreference.priority.indexOf(a.type);
            const priorityB = traits.technicalPreference.priority.indexOf(b.type);
            return priorityA - priorityB;
        });
    };

    // Generate personality-specific response
    const generateResponse = (insights) => {
        const phrases = p.messageStyle.commonPhrases;
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        let response = `${p.messageStyle.prefix}\n\n${randomPhrase}\n\n`;
        
        insights.forEach(insight => {
            const confidenceStr = p.messageStyle.includeConfidenceLevels ? 
                ` (${insight.confidence.toFixed(1)}% confidence)` : '';
            
            response += `${insight.message}${confidenceStr}\n`;
        });
        
        return response;
    };

    return generateResponse(filterInsights(analysis.insights));
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
            AUDHD: `Hey! I'm your AUDHD analyzer - I combine intense pattern recognition with rapid-fire insights! 🌟 *hyperfocusing while bouncing with energy*\n\nLet's analyze some charts! Drop a contract address and we'll explore EVERYTHING!`,
            PATTERN_MASTER: `Greetings! I'm your Pattern Master analyzer. I specialize in identifying complex chart formations and predicting their outcomes. 📊\n\nProvide a contract address, and I'll reveal the hidden patterns within the data.`
        },
        error: {
            AUTISM: `*nervously adjusts glasses* I apologize, but my pattern recognition encountered an error. Could we try analyzing a different contract?`,
            ADHD: `Oops! Got distracted by an error! Let's quickly try something else - there are so many other exciting charts to analyze!`,
            AUDHD: `*switches focus rapidly* Error in pattern analysis! But wait - we could analyze something else! So many other patterns to explore!`,
            PATTERN_MASTER: `*pattern recognition temporarily disrupted* Analysis error detected. Please provide a different contract for pattern analysis.`
        }
    };

    // Get response based on type and personality
    const response = responses[type]?.[personality];
    
    // Return response or default to a common phrase if type not found
    return response || p.messageStyle.commonPhrases[Math.floor(Math.random() * p.messageStyle.commonPhrases.length)];
};

export default {
    personalities,
    getPersonalityResponse,
    generatePersonalityResponse
};