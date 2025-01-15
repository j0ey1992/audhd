import React, { useState, useRef, useEffect } from 'react';
import styles from './AI.module.css';
import {
  getTokenAnalysis,
  isValidContractAddress,
  analyzeUserQuestion,
} from './services/dataService';
import { getTokenByContract } from './services/dexService';
import { personalities, getPersonalityResponse } from './services/personalities';

// Helper function to generate mini chart data
const generateMiniChart = ({ price, previousPrice, support, resistance }) => {
  const currentPrice = price || 0;
  const prevPrice = previousPrice || price || 0;
  const supportLevel = support || (price ? price * 0.95 : 0);
  const resistanceLevel = resistance || (price ? price * 1.05 : 0);
  const change = prevPrice ? ((currentPrice - prevPrice) / prevPrice) * 100 : 0;

  return `📊 Chart Data
Current Price: $${currentPrice.toFixed(8)}
24h Change: ${change.toFixed(2)}%
Support Level: $${supportLevel.toFixed(8)}
Resistance Level: $${resistanceLevel.toFixed(8)}`;
};

// Import modular components
import PersonalitySelector from './components/PersonalitySelector';
import Message from './components/Message';
import TokenStats from './components/TokenStats';
import ChartComponent from './components/ChartComponent';

const AI = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [personality, setPersonality] = useState('AUTISM');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: getPersonalityResponse('AUTISM', 'greeting'),
      personality: 'AUTISM',
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [showContractInput, setShowContractInput] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePersonalityChange = (newPersonality) => {
    setPersonality(newPersonality);
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        content: getPersonalityResponse(newPersonality, 'greeting'),
        personality: newPersonality,
      },
    ]);
  };

  const handleQuickAction = async (actionType) => {
    if (!contractAddress || isAnalyzing) return;

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
      setAnalysisData(analysis);

      // Example miniChart generation
      const miniChart = generateMiniChart({
        price: analysis.tokenData.price.current,
        previousPrice: analysis.tokenData.price.previous,
        support: analysis.tokenData.chart.support,
        resistance: analysis.tokenData.chart.resistance,
      });

      const randomPhrase =
        personalities[personality].messageStyle.commonPhrases[
          Math.floor(Math.random() * personalities[personality].messageStyle.commonPhrases.length)
        ];

      const aiResponse = `${
        personalities[personality].messageStyle.prefix
      } Let me analyze ${analysis.tokenData.metadata.name} (${
        analysis.tokenData.metadata.symbol
      })!\n\n${randomPhrase}\n\n${
        analysis.chartAnalysis
      }\n\n*excitedly points at patterns* ${analysis.sentimentAnalysis}`;

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: 'bot',
          content: aiResponse,
          personality,
          miniChart,
        },
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: 'bot',
          content: getPersonalityResponse(personality, 'error'),
          personality,
        },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMessageSubmit = async (customMessage = null) => {
    const messageToSend = customMessage || currentMessage;
    if (!messageToSend.trim() || isAnalyzing || !contractAddress) return;

    setIsAnalyzing(true);
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: messageToSend },
      {
        type: 'bot',
        content: `${personalities[personality].messageStyle.prefix} Analyzing your question...`,
        personality,
        loading: true,
      },
    ]);
    setCurrentMessage('');

    try {
      const analysis = await getTokenAnalysis(contractAddress);
      const aiResponse = await analyzeUserQuestion(messageToSend, analysis.tokenData);

      // Example miniChart generation
      const miniChart = generateMiniChart({
        price: analysis.tokenData.price.current,
        previousPrice: analysis.tokenData.price.previous,
        support: analysis.tokenData.chart.support,
        resistance: analysis.tokenData.chart.resistance,
      });

      const randomPhrase =
        personalities[personality].messageStyle.commonPhrases[
          Math.floor(Math.random() * personalities[personality].messageStyle.commonPhrases.length)
        ];

      const formattedResponse = `${
        personalities[personality].messageStyle.prefix
      }\n\n${randomPhrase}\n\n${aiResponse}`;

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: 'bot',
          content: formattedResponse,
          personality,
          miniChart,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: 'bot',
          content: getPersonalityResponse(personality, 'error'),
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
            className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] ${styles['animate-grid-flow']}`}
          />
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),transparent_70%)] ${styles['animate-pulse-slow']}`}
          />
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(var(--color-primary-rgb),0.1),transparent_40%)] ${styles['animate-pulse-slow-delay']}`}
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
            <p className="text-xl text-gray-600 font-heading max-w-2xl mx-auto mb-4">
              When "slightly obsessed with charts" is actually a superpower!
              <br />
              We'll analyze every single detail.
            </p>
            <PersonalitySelector
              currentPersonality={personality}
              onSelect={handlePersonalityChange}
            />
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
                <PersonalitySelector
                  currentPersonality={personality}
                  onSelect={handlePersonalityChange}
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Chart Display
                Hidden in fullscreen mode and on mobile (max-width: 768px). 
            */}
            {analysisData &&
              !isFullscreen &&
              !window.matchMedia('(max-width: 768px)').matches && (
                <div className="mb-6">
                  <ChartComponent data={analysisData.tokenData.chart.prices} />
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

/* 
   NOTE:
   1. You must have a valid `generateMiniChart()` function 
      imported or declared somewhere to create `miniChart`.
   2. This code references sub-components like PersonalitySelector, Message, etc. 
      Make sure those are present in your codebase.
*/
