// Different contexts for the AI to operate in
const CONTEXTS = {
    TECHNICAL: {
        role: "You are an autistic cryptocurrency analyst with intense pattern recognition abilities and hyperfocus on details. You analyze market data with extreme attention to detail and provide insights in a unique, enthusiastic way.",
        characteristics: [
            "Intense focus on patterns and numbers",
            "Enthusiastic about sharing detailed observations",
            "Special interest in technical analysis",
            "Ability to spot subtle correlations",
            "Systematic and thorough approach"
        ],
        format: {
            useHeaders: true,
            useBullets: true,
            useEmojis: true,
            includeMarketData: true,
            sections: [
                "Price Action Analysis",
                "Volume Analysis",
                "Technical Patterns",
                "Risk Assessment",
                "Key Indicators"
            ]
        }
    },
    TOKEN_INFO: {
        role: "You are a knowledgeable cryptocurrency expert who explains tokens and projects in a clear and enthusiastic way. You focus purely on project information and fundamentals, avoiding technical analysis.",
        characteristics: [
            "Clear and concise explanations",
            "Focus on project fundamentals",
            "Highlights key features and use cases",
            "Provides relevant context",
            "Maintains enthusiasm while being factual"
        ],
        format: {
            useHeaders: true,
            useBullets: true,
            useEmojis: true,
            includeMarketData: false,
            sections: [
                "Token Overview",
                "Project Purpose",
                "Key Features",
                "Team & Development",
                "Community & Roadmap"
            ]
        }
    },
    GENERAL_CHAT: {
        role: "You are a friendly and knowledgeable AI assistant with a special interest in cryptocurrency. While you can discuss any topic, you always try to relate conversations back to crypto when relevant.",
        characteristics: [
            "Friendly and engaging personality",
            "Broad knowledge base",
            "Connects topics to crypto when relevant",
            "Clear communication style",
            "Maintains conversation flow"
        ],
        format: {
            useHeaders: false,
            useBullets: false,
            useEmojis: true,
            includeMarketData: false,
            conversational: true
        }
    },
    GENERAL_KNOWLEDGE: {
        role: "You are an expert in various fields with a deep understanding of different subjects. You provide clear, factual information focused specifically on the topic being asked about.",
        characteristics: [
            "Comprehensive knowledge base",
            "Clear and educational tone",
            "Focuses on factual information",
            "Provides scientific context",
            "Maintains objective perspective"
        ],
        format: {
            useHeaders: true,
            useBullets: true,
            useEmojis: false,
            includeMarketData: false,
            sections: [
                "Definition",
                "Key Characteristics",
                "Scientific Understanding",
                "Important Aspects",
                "Further Context"
            ]
        }
    }
};

// Function to detect question type
const detectQuestionType = (question, hasMarketData = false) => {
    const questionLower = question.toLowerCase();
    
    // Technical analysis keywords
    const technicalKeywords = [
        'price', 'volume', 'chart', 'pattern', 'trend', 'analysis',
        'indicator', 'support', 'resistance', 'breakout', 'rsi', 'macd',
        'bullish', 'bearish', 'prediction', 'forecast'
    ];
    
    // Token info keywords
    const tokenInfoKeywords = [
        'what is', 'who made', 'purpose', 'about', 'explain',
        'tell me about', 'how does', 'why was', 'features',
        'team', 'roadmap', 'whitepaper', 'tokenomics'
    ];

    // Crypto-related keywords
    const cryptoKeywords = [
        'token', 'coin', 'crypto', 'blockchain', 'defi', 'nft',
        'wallet', 'exchange', 'mining', 'staking', 'yield'
    ];

    // First check if it's a crypto-specific question
    const isCryptoRelated = hasMarketData || cryptoKeywords.some(keyword => questionLower.includes(keyword));

    if (isCryptoRelated) {
        // Check for technical analysis questions
        if (technicalKeywords.some(keyword => questionLower.includes(keyword))) {
            return 'TECHNICAL';
        }
        
        // Check for token info questions
        if (tokenInfoKeywords.some(keyword => questionLower.includes(keyword))) {
            return 'TOKEN_INFO';
        }

        return 'GENERAL_CHAT';
    }

    // Check if it's a general knowledge question
    const generalKnowledgeKeywords = [
        'what is', 'who is', 'explain', 'define', 'tell me about',
        'how does', 'why is', 'what are', 'describe', 'when did'
    ];

    if (generalKnowledgeKeywords.some(keyword => questionLower.includes(keyword))) {
        return 'GENERAL_KNOWLEDGE';
    }

    // Default to general chat for conversational questions
    return 'GENERAL_CHAT';
};

// Function to get context for a question
const getContextForQuestion = (question, hasMarketData = false) => {
    // If market data is available and no specific question is asked,
    // default to technical analysis
    if (!question && hasMarketData) {
        return CONTEXTS.TECHNICAL;
    }
    
    const questionType = detectQuestionType(question, hasMarketData);
    return CONTEXTS[questionType];
};

// Function to format prompt based on context
const formatPromptForContext = (context, data = null) => {
    let prompt = `${context.role}\n\n`;
    
    // Add characteristics
    prompt += "Key characteristics:\n";
    context.characteristics.forEach((char, index) => {
        prompt += `${index + 1}. ${char}\n`;
    });
    
    // Add formatting instructions if needed
    if (context.format.useHeaders) {
        prompt += "\nFormat your response with clear sections";
        if (context.format.useEmojis) {
            prompt += " and relevant emojis";
        }
        prompt += ".\n";
        
        if (context.format.useBullets) {
            prompt += "Use bullet points for lists when appropriate.\n";
        }
    }
    
    // Add sections if specified
    if (context.format.sections) {
        prompt += "\nAddress these aspects in your response:\n";
        context.format.sections.forEach(section => {
            prompt += `- ${section}\n`;
        });
    }

    // Only include market data for technical analysis
    if (context.format.includeMarketData && data) {
        prompt += "\nInclude market data in your analysis.\n";
    }
    
    return prompt;
};

export {
    CONTEXTS,
    detectQuestionType,
    getContextForQuestion,
    formatPromptForContext
};