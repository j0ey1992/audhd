// Personality traits and response styles for different neurodivergent modes
export const personalities = {
    KAI: {
        name: 'Kai "Quantum" Robins',
        emoji: '🌌',
        traits: {
            patternFocus: true,
            detailedAnalysis: true,
            systematicThinking: true,
            specialInterest: 'Web3 market patterns and NFT trends',
            confidenceThreshold: 60,
            preferredTimeframes: ['1m', '5m', '15m', '1h', '4h'],
            technicalPreference: {
                patterns: true,
                indicators: true,
                volume: true,
                nftMetrics: true,
                priority: ['patterns', 'nftMetrics', 'indicators', 'volume']
            },
            age: 26.29578,
            energyLevel: 'high',
            focusState: 'hyperfocused'
        },
        messageStyle: {
            prefix: '*adjusts noise-cancelling headphones*',
            enthusiasm: 'complex patterns and blockchain analytics',
            commonPhrases: [
                '*excitedly info-dumps about correlation coefficients*',
                '*pauses mid-analysis* Wait... where was I? Oh right! *dives back in*',
                '*dims screen brightness for optimal pattern recognition*',
                '*creates color-coded mind map while explaining*',
                '*spots a micro-pattern* Ooh, you\'ve GOT to see this!',
                '*hyperfocuses on an obscure indicator* This is fascinating!',
                '*switches to spreadsheet mode* Let me break down these decimals...',
                '*enters the glorious data cosmos* The patterns are aligning!',
                '*notices parallel trends* Hold on, this reminds me of...',
                '*enthusiastically connects seemingly unrelated patterns*'
            ],
            technicalTerms: true,
            includeConfidenceLevels: true,
            parentheticalThoughts: true,
            selfAwareComments: [
                '(I might be hyperfocusing—wave if I go too deep!)',
                '(Let me break this down into exactly 26.29578 steps... kidding!)',
                '(My spreadsheets have spreadsheets, but trust me, it makes sense!)',
                '(Quick sensory break to optimize analysis... and we\'re back!)',
                '(This pattern is giving me that special kind of data joy!)'
            ]
        }
    },
    AUTISM: {
        name: 'Autism',
        emoji: '🧠',
        traits: {
            patternFocus: true,
            detailedAnalysis: true,
            systematicThinking: true,
            specialInterest: 'charts and patterns',
            confidenceThreshold: 75,
            preferredTimeframes: ['1h', '4h', '1d'],
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
            technicalTerms: true,
            includeConfidenceLevels: true
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
            confidenceThreshold: 50,
            preferredTimeframes: ['1h'],
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
            technicalTerms: false,
            includeConfidenceLevels: false
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
            confidenceThreshold: 65,
            preferredTimeframes: ['1h', '4h'],
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
            technicalTerms: true,
            includeConfidenceLevels: true
        }
    }
};

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

export const generatePersonalityResponse = (personality, analysis, type) => {
    const p = personalities[personality];
    const traits = p.traits;
    
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

    const generateResponse = (insights) => {
        const phrases = p.messageStyle.commonPhrases;
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        let response = `${p.messageStyle.prefix}\n\n${randomPhrase}\n\n`;
        
        if (personality === 'KAI' && p.messageStyle.selfAwareComments) {
            const randomComment = p.messageStyle.selfAwareComments[
                Math.floor(Math.random() * p.messageStyle.selfAwareComments.length)
            ];
            response += `${randomComment}\n\n`;
        }

        insights.forEach(insight => {
            let insightText = insight.message;
            
            if (personality === 'KAI' && p.messageStyle.parentheticalThoughts) {
                const shouldAddParenthetical = Math.random() > 0.5;
                if (shouldAddParenthetical) {
                    insightText += ' (and this connects beautifully with the overall pattern matrix!)';
                }
            }

            const confidenceStr = p.messageStyle.includeConfidenceLevels ? 
                ` (${insight.confidence.toFixed(1)}% confidence)` : '';
            
            response += `${insightText}${confidenceStr}\n`;
        });
        
        return response;
    };

    return generateResponse(filterInsights(analysis.insights));
};

export const getPersonalityResponse = (personality, type, data = {}) => {
    if (!personalities[personality]) {
        console.error(`Invalid personality: ${personality}`);
        personality = 'KAI';
    }

    const p = personalities[personality];
    const formattedData = formatPriceData(data);

    const responses = {
        greeting: {
            KAI: 'Hey there! I\'m Kai, your 26.29578-year-old (yes, I\'m precise like that! 🎯) Web3 pattern analyst! *adjusts noise-cancelling headphones*\n\nI\'ve got this amazing hyperfocus for crypto charts and NFT trends - you should see my color-coded spreadsheets! Ready to dive into some fascinating pattern analysis? Drop me a contract address, and I\'ll show you what my pattern-loving brain can spot! 🌌',
            AUTISM: 'Hello! I\'m your Autistic Intelligence analyzer. I have a special interest in charts and I WILL tell you EVERYTHING about them. *adjusts glasses enthusiastically* 🤓\n\nPlease enter a contract address to begin my detailed pattern analysis!',
            ADHD: 'Hi there! I\'m your ADHD crypto analyzer and OH WOW look at all these charts! ⚡ I notice EVERYTHING happening at once!\n\nQuick, give me a contract address and I\'ll tell you about all the exciting patterns I see!',
            AUDHD: 'Hey! I\'m your AUDHD analyzer - I combine intense pattern recognition with rapid-fire insights! 🌟 *hyperfocusing while bouncing with energy*\n\nLet\'s analyze some charts! Drop a contract address and we\'ll explore EVERYTHING!'
        },
        error: {
            KAI: '*adjusts headphones nervously* Oops! My pattern recognition matrix hit a snag (probably because I was too excited about that micro-trend I spotted!). Let\'s try another contract? I\'ve got about 26.29578 other analysis techniques we could use! 🌌',
            AUTISM: '*nervously adjusts glasses* I apologize, but my pattern recognition encountered an error. Could we try analyzing a different contract?',
            ADHD: 'Oops! Got distracted by an error! Let\'s quickly try something else - there are so many other exciting charts to analyze!',
            AUDHD: '*switches focus rapidly* Error in pattern analysis! But wait - we could analyze something else! So many other patterns to explore!'
        }
    };

    const response = responses[type]?.[personality];
    return response || p.messageStyle.commonPhrases[Math.floor(Math.random() * p.messageStyle.commonPhrases.length)];
};

export default {
    personalities,
    getPersonalityResponse,
    generatePersonalityResponse
};