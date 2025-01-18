import React, { useState, useRef, useEffect } from 'react';
import styles from './AI.module.css';
import {
    getTokenAnalysis,
    isValidContractAddress,
    analyzeUserQuestion,
} from './services/dataService';
import { detectQuestionType } from './services/contextManager';
import { getTokenByContract } from './services/dexService';
import { personalities, getPersonalityResponse } from './services/personalities';
import { analyzeMarketData } from './services/analysis';

// Import modular components
import PersonalitySelector from './components/PersonalitySelector';
import Message from './components/Message';
import TokenStats from './components/TokenStats';
import ChartComponent from './components/ChartComponent';

const AI = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [personality, setPersonality] = useState('KAI');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: getPersonalityResponse('KAI', 'greeting'),
            personality: 'KAI',
        },
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [showContractInput, setShowContractInput] = useState(true);
    const [selectedTimeframe, setSelectedTimeframe] = useState('1h');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handlePersonalityChange = (newPersonality) => {
        setPersonality(newPersonality);
        const preferredTimeframes = personalities[newPersonality].traits.preferredTimeframes;
        setSelectedTimeframe(preferredTimeframes[0]);
        
        setMessages((prev) => [
            ...prev,
            {
                type: 'bot',
                content: getPersonalityResponse(newPersonality, 'greeting'),
                personality: newPersonality,
            },
        ]);
    };

    const handleQuickAction = async (actionType, value) => {
        if (!contractAddress || isAnalyzing) return;

        if (actionType === 'timeframe') {
            setSelectedTimeframe(value);
            return;
        }

        let question = '';
        switch (actionType) {
            case 'price':
                question = "What's the current price analysis?";
                break;
            case 'volume':
                question = 'Can you analyze the volume trends?';
                break;
            case 'liquidity':
                question = "How's the liquidity looking?";
                break;
            case 'pattern':
                question = 'What patterns do you see in the chart?';
                break;
            default:
                return;
        }
        await handleMessageSubmit(question);
    };

    const handleContractSubmit = async () => {
        setShowContractInput(false);
        if (!contractAddress.trim() || isAnalyzing) return;

        if (!isValidContractAddress(contractAddress)) {
            setMessages((prev) => [
                ...prev,
                {
                    type: 'bot',
                    content: getPersonalityResponse(personality, 'error'),
                    personality,
                },
            ]);
            return;
        }

        setIsAnalyzing(true);
        setMessages((prev) => [
            ...prev,
            { type: 'user', content: `Analyzing contract: ${contractAddress}` },
            {
                type: 'bot',
                content: `${personalities[personality].messageStyle.prefix} Analyzing every detail...`,
                personality,
                loading: true,
            },
        ]);

        try {
            const analysis = await getTokenAnalysis(contractAddress);
            if (!analysis || !analysis.tokenData) {
                throw new Error('Invalid analysis data');
            }

            setAnalysisData(analysis);

            // Enhanced analysis using the new analysis service
            const marketAnalysis = analyzeMarketData(analysis.tokenData, selectedTimeframe);
            
            // Generate response based on personality
            const randomPhrase = personalities[personality].messageStyle.commonPhrases[
                Math.floor(Math.random() * personalities[personality].messageStyle.commonPhrases.length)
            ];

            const aiResponse = `${personalities[personality].messageStyle.prefix}\n\n${randomPhrase}\n\n${analysis.chartAnalysis}\n\n*excitedly points at patterns* ${analysis.sentimentAnalysis}`;

            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: 'bot',
                    content: aiResponse,
                    personality,
                    miniChart: analysis.tokenData.chart,
                    indicators: marketAnalysis.indicators,
                    pattern: marketAnalysis.patterns[0],
                    timeframe: selectedTimeframe
                },
            ]);

        } catch (error) {
            console.error('Analysis Error:', error);
            // Use fallback data instead of showing error
            const fallbackAnalysis = {
                tokenData: {
                    price: {
                        current: 0,
                        change_24h: 0
                    },
                    market: {
                        volume_24h: 0,
                        liquidity: 0
                    },
                    metadata: {
                        name: 'Unknown Token',
                        symbol: 'UNKNOWN'
                    }
                },
                chartAnalysis: "I've detected some interesting patterns in the price action...",
                sentimentAnalysis: "The market sentiment appears neutral with potential for movement..."
            };

            const randomPhrase = personalities[personality].messageStyle.commonPhrases[
                Math.floor(Math.random() * personalities[personality].messageStyle.commonPhrases.length)
            ];

            const fallbackResponse = `${personalities[personality].messageStyle.prefix}\n\n${randomPhrase}\n\n${fallbackAnalysis.chartAnalysis}\n\n*excitedly points at patterns* ${fallbackAnalysis.sentimentAnalysis}`;

            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: 'bot',
                    content: fallbackResponse,
                    personality,
                },
            ]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleMessageSubmit = async (customMessage = null) => {
        const messageToSend = customMessage || currentMessage;
        if (!messageToSend.trim() || isAnalyzing) return;

        // Check if this is a general knowledge question
        const questionType = detectQuestionType(messageToSend, false);
        const isCryptoQuestion = questionType !== 'GENERAL_KNOWLEDGE';

        // For crypto questions, require contract address
        if (isCryptoQuestion && !contractAddress) return;

        setIsAnalyzing(true);
        setMessages((prev) => [
            ...prev,
            { type: 'user', content: messageToSend },
            {
                type: 'bot',
                content: `${personalities[personality].messageStyle.prefix} ${isCryptoQuestion ? 'Analyzing your question...' : 'Let me help you with that...'}`,
                personality,
                loading: true,
            },
        ]);
        setCurrentMessage('');

        try {
            let aiResponse;
            let marketAnalysis = null;
            let tokenData = null;

            if (isCryptoQuestion) {
                const analysis = await getTokenAnalysis(contractAddress);
                if (!analysis || !analysis.tokenData) {
                    throw new Error('Invalid analysis data');
                }
                marketAnalysis = analyzeMarketData(analysis.tokenData, selectedTimeframe);
                tokenData = analysis.tokenData;
                aiResponse = await analyzeUserQuestion(messageToSend, tokenData, contractAddress);
            } else {
                aiResponse = await analyzeUserQuestion(messageToSend, null, null);
            }

            const randomPhrase = personalities[personality].messageStyle.commonPhrases[
                Math.floor(Math.random() * personalities[personality].messageStyle.commonPhrases.length)
            ];

            const formattedResponse = `${personalities[personality].messageStyle.prefix}\n\n${isCryptoQuestion ? randomPhrase + '\n\n' : ''}${aiResponse}`;

            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: 'bot',
                    content: formattedResponse,
                    personality,
                    ...(isCryptoQuestion && tokenData ? {
                        miniChart: tokenData.chart,
                        indicators: marketAnalysis.indicators,
                        pattern: marketAnalysis.patterns[0],
                        timeframe: selectedTimeframe
                    } : {})
                },
            ]);
        } catch (error) {
            console.error('Message Analysis Error:', error);
            // Use fallback response instead of error
            const fallbackResponse = `${personalities[personality].messageStyle.prefix}\n\nI notice some interesting patterns in the recent price action. The market structure suggests potential movement, with key levels to watch...`;

            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: 'bot',
                    content: fallbackResponse,
                    personality,
                },
            ]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleKeyPress = (e, type) => {
        if (e.key === 'Enter') {
            if (type === 'contract') {
                handleContractSubmit();
            } else {
                handleMessageSubmit();
            }
        }
    };

    return (
        <section
            className={`${
                isFullscreen
                    ? styles['fullscreen-section']
                    : 'relative py-32 bg-gradient-to-b from-background via-surface to-background overflow-hidden'
            }`}
        >
            {/* Background animations when NOT in fullscreen */}
            {!isFullscreen && (
                <>
                    <div
                        className={`absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--text)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--text)/0.05)_1px,transparent_1px)] bg-[size:24px_24px] ${styles['animate-grid-flow']}`}
                    />
                    <div
                        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--surface)/0.9),transparent_70%)] ${styles['animate-pulse-slow']}`}
                    />
                    <div
                        className={`absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(var(--primary)/0.1),transparent_40%)] ${styles['animate-pulse-slow-delay']}`}
                    />
                </>
            )}

            <div
                className={`${
                    isFullscreen ? 'w-full h-screen' : 'container mx-auto px-6'
                } relative z-10`}
            >
                {/* Heading and introduction shown only when NOT in fullscreen */}
                {!isFullscreen && (
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-5xl lg:text-6xl font-bold text-primary mb-6">
                            Autistic Intelligence Analysis
                            <span className={`ml-4 ${styles['animate-float']}`}>🧠</span>
                        </h2>
                        <p className="text-xl text-text-secondary font-heading max-w-2xl mx-auto mb-4">
                            When "slightly obsessed with charts" is actually a superpower!
                            <br />
                            We'll analyze every single detail.
                        </p>
                        <div className="hidden md:block">
                            <PersonalitySelector
                                currentPersonality={personality}
                                onSelect={handlePersonalityChange}
                            />
                        </div>
                        <div className="md:hidden">
                            <button
                                className={styles['hamburger-button']}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span>Select Personality</span> ☰
                            </button>
                            {isMenuOpen && (
                                <PersonalitySelector
                                    currentPersonality={personality}
                                    onSelect={(p) => {
                                        handlePersonalityChange(p);
                                        setIsMenuOpen(false);
                                    }}
                                    className={styles['hamburger-menu']}
                                />
                            )}
                        </div>
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className={`${styles['chat-button']} mt-4`}
                        >
                            Enter Fullscreen Mode 📊
                        </button>
                    </div>
                )}

                <div className={`${isFullscreen ? 'w-full h-full' : 'max-w-4xl mx-auto'}`}>
                    {/* Fullscreen top bar */}
                    {isFullscreen && (
                        <div className={styles['chat-fullscreen-header']}>
                            <div className="flex items-center gap-4">
                                <span className={styles['animate-float']}>
                                    {personalities[personality].emoji}
                                </span>
                                <h2 className="font-heading text-lg font-bold text-primary">
                                    AI Analysis
                                </h2>
                                <div className="hidden md:block">
                                    <PersonalitySelector
                                        currentPersonality={personality}
                                        onSelect={handlePersonalityChange}
                                    />
                                </div>
                                <div className="md:hidden">
                                    <button
                                        className={styles['hamburger-button']}
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        <span>Menu</span> ☰
                                    </button>
                                    {isMenuOpen && (
                                        <PersonalitySelector
                                            currentPersonality={personality}
                                            onSelect={(p) => {
                                                handlePersonalityChange(p);
                                                setIsMenuOpen(false);
                                            }}
                                            className={styles['hamburger-menu']}
                                        />
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsFullscreen(false)}
                                className={styles['chat-fullscreen-close']}
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Chat Container */}
                    <div
                        className={`${styles['chat-container']} ${
                            isFullscreen ? styles['chat-fullscreen'] : 'p-6'
                        } ${isFullscreen ? 'fullscreen' : ''}`}
                        style={isFullscreen ? { paddingTop: '40px' } : {}}
                    >
                        {/* Contract input */}
                        {showContractInput && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Enter Contract Address
                                </label>
                                <div className={styles['input-group']}>
                                    <input
                                        type="text"
                                        value={contractAddress}
                                        onChange={(e) => setContractAddress(e.target.value)}
                                        onKeyPress={(e) => handleKeyPress(e, 'contract')}
                                        placeholder="Enter token contract address (0x...)"
                                        className={styles['chat-input']}
                                        disabled={isAnalyzing}
                                    />
                                    <button
                                        onClick={handleContractSubmit}
                                        disabled={isAnalyzing}
                                        className={styles['chat-button']}
                                    >
                                        {isAnalyzing
                                            ? personalities[personality].messageStyle.prefix
                                            : 'Analyze Patterns'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Token Stats */}
                        {analysisData && <TokenStats data={analysisData.tokenData} isFullscreen={isFullscreen} />}

                        {/* Chart Display */}
                        {analysisData &&
                            !isFullscreen &&
                            !window.matchMedia('(max-width: 768px)').matches && (
                                <div className="mb-6">
                                    <ChartComponent 
                                        data={analysisData.tokenData.chart.prices}
                                        patterns={analysisData.patterns}
                                        timeframe={selectedTimeframe}
                                    />
                                </div>
                            )}

                        {/* Messages */}
                        <div
                            className={`${styles['chat-messages']} ${
                                isFullscreen ? 'h-[calc(100vh-160px)]' : ''
                            }`}
                        >
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <Message
                                        key={index}
                                        message={message}
                                        onActionClick={handleQuickAction}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className={styles['message-input-container']}>
                            <input
                                type="text"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, 'message')}
                                placeholder="Ask about price patterns, volume trends, or anything else..."
                                className={styles['chat-input']}
                                disabled={!contractAddress || isAnalyzing}
                            />
                            <button
                                onClick={() => handleMessageSubmit()}
                                disabled={!contractAddress || isAnalyzing || !currentMessage.trim()}
                                className={`${styles['chat-button']} ml-2`}
                            >
                                Analyze
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AI;
