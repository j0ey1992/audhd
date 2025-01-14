import React, { useState, useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import styles from './AI.module.css';
import { getTokenAnalysis, formatNumber, formatPercentage, isValidContractAddress } from './services/dataService';

// Function to format text with markdown-style bold
const formatMessage = (text) => {
    if (!text) return '';
    // Replace **text** with bold spans
    return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="font-bold text-primary">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return part;
    });
};

const Message = ({ message }) => (
    <div className={`flex gap-4 ${styles['animate-fade-in']}`}>
        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
            {message.type === 'bot' ? '🧠' : '👤'}
        </div>
        <div className={`flex-1 ${message.type === 'bot' ? 'bg-primary/5' : 'bg-secondary/5'} rounded-xl p-4`}>
            <p className="text-gray-700 whitespace-pre-wrap">
                {formatMessage(message.content)}
                {message.loading && <span className={styles['loading-dots']} />}
            </p>
        </div>
    </div>
);

const ChartComponent = ({ data }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current || !data) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: 'transparent' },
                textColor: '#333',
            },
            grid: {
                vertLines: { color: 'rgba(0, 0, 0, 0.1)' },
                horzLines: { color: 'rgba(0, 0, 0, 0.1)' },
            },
        });

        const lineSeries = chart.addLineSeries({
            color: 'rgb(0, 120, 255)',
            lineWidth: 2,
        });
        
        lineSeries.setData(data.map(point => ({
            time: point.time / 1000,
            value: point.value
        })));

        chartRef.current = chart;

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <div className={styles['chart-container']}>
            <div ref={chartContainerRef} className="w-full h-[400px]" />
        </div>
    );
};

const TokenStats = ({ data }) => {
    if (!data) return null;
    const { price, market, metadata } = data;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/90 rounded-xl p-4 border border-primary/20">
                <div className="text-sm text-gray-600">Price</div>
                <div className="text-xl font-bold">${formatNumber(price.current)}</div>
                <div className={`text-sm ${price.change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(price.change_24h)}
                </div>
            </div>
            <div className="bg-white/90 rounded-xl p-4 border border-primary/20">
                <div className="text-sm text-gray-600">Liquidity</div>
                <div className="text-xl font-bold">${formatNumber(market.liquidity)}</div>
            </div>
            <div className="bg-white/90 rounded-xl p-4 border border-primary/20">
                <div className="text-sm text-gray-600">24h Volume</div>
                <div className="text-xl font-bold">${formatNumber(market.volume_24h)}</div>
            </div>
            <div className="bg-white/90 rounded-xl p-4 border border-primary/20">
                <div className="text-sm text-gray-600">Chain</div>
                <div className="text-xl font-bold">{metadata.chain}</div>
                <div className="text-sm text-gray-600">{metadata.dex}</div>
            </div>
        </div>
    );
};

const AI = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: "Hello! I'm your Autistic Investor analyzer. I have a special interest in charts and I WILL tell you EVERYTHING about them. *adjusts glasses enthusiastically* 🤓\n\nPlease enter a contract address to begin analysis!"
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleContractSubmit = async () => {
        if (!contractAddress.trim() || isAnalyzing) return;

        if (!isValidContractAddress(contractAddress)) {
            setMessages(prev => [...prev, 
                { type: 'bot', content: "*adjusts glasses nervously* That doesn't look like a valid contract address. Please make sure it starts with '0x' and is 42 characters long!" }
            ]);
            return;
        }
        
        setIsAnalyzing(true);
        setMessages(prev => [...prev, 
            { type: 'user', content: `Analyzing contract: ${contractAddress}` },
            { type: 'bot', content: '*hyperfixating intensifies* Analyzing EVERY SINGLE detail', loading: true }
        ]);

        try {
            const analysis = await getTokenAnalysis(contractAddress);
            setAnalysisData(analysis);

            // Format AI responses
            const aiResponse = `*adjusts glasses excitedly* Here's my analysis of ${analysis.tokenData.metadata.name} (${analysis.tokenData.metadata.symbol})! 🧠\n\n` +
                `${analysis.chartAnalysis}\n\n` +
                `${analysis.sentimentAnalysis}`;

            setMessages(prev => [
                ...prev.slice(0, -1),
                { type: 'bot', content: aiResponse }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev.slice(0, -1),
                { type: 'bot', content: "*nervously adjusts glasses* I couldn't analyze this contract. It might not be listed on any DEX yet, or there might be an issue with the contract." }
            ]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleMessageSubmit = async () => {
        if (!currentMessage.trim() || isAnalyzing || !contractAddress) return;

        const userMessage = currentMessage;
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setCurrentMessage('');

        try {
            const analysis = await getTokenAnalysis(contractAddress);
            let response = '*hyperfocus activated* ';

            const question = userMessage.toLowerCase();
            if (question.includes('price') || question.includes('value')) {
                response += `The current price is $${formatNumber(analysis.tokenData.price.current)} with a ${formatPercentage(analysis.tokenData.price.change_24h)} change in 24h!`;
            } else if (question.includes('volume')) {
                response += `24h volume is $${formatNumber(analysis.tokenData.market.volume_24h)}! That's ${analysis.tokenData.market.volume_24h > analysis.tokenData.market.liquidity ? 'HIGHER' : 'lower'} than the liquidity!`;
            } else if (question.includes('liquidity')) {
                response += `Liquidity is $${formatNumber(analysis.tokenData.market.liquidity)}! ${analysis.tokenData.market.liquidity > 100000 ? 'That\'s a good amount! 🌊' : 'Be careful with low liquidity! ⚠️'}`;
            } else {
                response += 'Let me analyze that specific aspect...\n\n' + analysis.chartAnalysis;
            }

            setMessages(prev => [...prev, { type: 'bot', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                type: 'bot',
                content: '*nervous laughter* Oops! Something went wrong with the analysis. Let me adjust my glasses and try again later!'
            }]);
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
        <section className="relative py-32 bg-gradient-to-b from-background via-surface to-background overflow-hidden">
            {/* Modern grid background with animation */}
            <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] ${styles['animate-grid-flow']}`}></div>
            
            {/* Animated radial gradients */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),transparent_70%)] ${styles['animate-pulse-slow']}`}></div>
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(var(--color-primary-rgb),0.1),transparent_40%)] ${styles['animate-pulse-slow-delay']}`}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-5xl lg:text-6xl font-bold text-primary mb-6">
                        Autistic Investor Analysis
                        <span className={`ml-4 ${styles['animate-float']}`}>🧠</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-heading max-w-2xl mx-auto">
                        When "slightly obsessed with charts" is actually a superpower! Our hyperfixation means we'll analyze every... single... detail.
                    </p>
                </div>

                {/* Chat Interface */}
                <div className="max-w-4xl mx-auto">
                    <div className="chat-container p-6">
                        {/* Contract Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Contract Address</label>
                            <div className="flex gap-4">
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
                                    {isAnalyzing ? '*Hyperfixating*' : 'Analyze Everything'}
                                </button>
                            </div>
                        </div>

                        {/* Token Stats */}
                        {analysisData && (
                            <TokenStats data={analysisData.tokenData} />
                        )}

                        {/* Chart Display */}
                        {analysisData && (
                            <div className="mb-6">
                                <ChartComponent data={analysisData.tokenData.chart.prices} />
                            </div>
                        )}

                        {/* Chat Messages */}
                        <div className={styles['chat-messages']}>
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <Message key={index} message={message} />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="relative mt-6">
                            <input
                                type="text"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, 'message')}
                                placeholder="Ask about price, volume, liquidity, or patterns..."
                                className={`${styles['chat-input']} w-full pr-24`}
                                disabled={!contractAddress || isAnalyzing}
                            />
                            <button 
                                onClick={handleMessageSubmit}
                                disabled={!contractAddress || isAnalyzing || !currentMessage.trim()}
                                className={`${styles['chat-button']} absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2`}
                            >
                                Info Dump
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AI;
