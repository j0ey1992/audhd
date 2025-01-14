import React, { useState, useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import styles from './AI.module.css';
import {
  getTokenAnalysis,
  formatNumber,
  formatPercentage,
  isValidContractAddress,
  analyzeUserQuestion,
} from './services/dataService';
import {
  personalities,
  getPersonalityResponse,
  generateMiniChart,
} from './services/personalities';

// Format text with markdown-style bold
const formatMessage = (text) => {
  if (!text) return '';
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

const PersonalitySelector = ({ currentPersonality, onSelect }) => (
  <div className={styles['personality-selector']}>
    {Object.entries(personalities).map(([key, p]) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        className={`${styles['personality-button']} ${
          currentPersonality === key ? styles['active'] : ''
        }`}
      >
        {p.emoji} {p.name}
      </button>
    ))}
  </div>
);

const QuickActions = ({
  onActionClick,
  showPriceAction,
  showVolumeAction,
  showLiquidityAction,
  showPatternAction,
}) => (
  <div className={styles['quick-actions']}>
    {showPriceAction && (
      <button onClick={() => onActionClick('price')} className={styles['quick-action-button']}>
        📊 Price Analysis
      </button>
    )}
    {showVolumeAction && (
      <button onClick={() => onActionClick('volume')} className={styles['quick-action-button']}>
        📈 Volume Trends
      </button>
    )}
    {showLiquidityAction && (
      <button onClick={() => onActionClick('liquidity')} className={styles['quick-action-button']}>
        💧 Liquidity Check
      </button>
    )}
    {showPatternAction && (
      <button onClick={() => onActionClick('pattern')} className={styles['quick-action-button']}>
        🔍 Pattern Detection
      </button>
    )}
  </div>
);

const Message = ({ message, onActionClick }) => (
  <div className={`flex gap-4 ${styles['animate-fade-in']}`}>
    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
      {message.type === 'bot' ? personalities[message.personality].emoji : '👤'}
    </div>
    <div
      className={`flex-1 ${
        message.type === 'bot' ? 'bg-primary/5' : 'bg-secondary/5'
      } rounded-xl p-4`}
    >
      <p className="text-gray-700 whitespace-pre-wrap">
        {formatMessage(message.content)}
        {message.loading && <span className={styles['loading-dots']} />}
      </p>
      {message.miniChart && (
        <pre className={styles['mini-chart']}>{message.miniChart}</pre>
      )}
      {message.type === 'bot' && !message.loading && (
        <QuickActions
          onActionClick={onActionClick}
          showPriceAction={message.content.toLowerCase().includes('price')}
          showVolumeAction={message.content.toLowerCase().includes('volume')}
          showLiquidityAction={message.content.toLowerCase().includes('liquidity')}
          showPatternAction={message.content.toLowerCase().includes('pattern')}
        />
      )}
    </div>
  </div>
);

/**
 * Draggable chart window. 
 * 
 * 1) We reduce size so it doesn't overshadow the chat.
 * 2) In mobile, it transitions to bottom-sheet style at ~40vh.
 */
const ChartWindow = ({ data, onClose, onMinimize }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [position, setPosition] = useState({ x: 20, y: 80 }); // start a bit down & right
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!chartContainerRef.current || !data) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight - 40, // subtract header
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

    lineSeries.setData(
      data.map((point) => ({
        time: point.time / 1000,
        value: point.value,
      }))
    );

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight - 40,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  const handleMouseDown = (e) => {
    // Don’t drag if user clicked a button
    if (e.target.closest(`.${styles['chart-window-button']}`)) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    // Keep window within viewport bounds 
    const windowWidth = 400; // UPDATED SIZING
    const windowHeight = 300; // UPDATED SIZING
    const maxX = window.innerWidth - windowWidth;
    const maxY = window.innerHeight - windowHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={styles['chart-window']}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className={styles['chart-window-header']} onMouseDown={handleMouseDown}>
        <div className={styles['chart-window-title']}>Price Chart</div>
        <div className={styles['chart-window-controls']}>
          <button className={styles['chart-window-button']} onClick={onMinimize}>
            ⎯
          </button>
          <button className={styles['chart-window-button']} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        className={`${styles['chart-container']} ${styles['windowed']}`}
      />
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
        <div
          className={`text-sm ${
            price.change_24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
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
  const [showChart, setShowChart] = useState(false); // default hidden

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

      // Show the chart pop-up by default after analysis
      setShowChart(true);
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

  // Inline Chart Example (below stats) if needed
  const ChartComponent = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (!data || !chartRef.current) return;

      const chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 280,
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
        color: 'rgb(255, 99, 132)',
        lineWidth: 2,
      });

      lineSeries.setData(
        data.map((point) => ({
          time: point.time / 1000,
          value: point.value,
        }))
      );

      const handleResize = () => {
        if (chartRef.current) {
          chart.applyOptions({
            width: chartRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: 280 }} />;
  };

  return (
    <section
      className={`${
        isFullscreen
          ? styles['fullscreen-section']
          : 'relative py-32 bg-gradient-to-b from-background via-surface to-background overflow-hidden'
      }`}
    >
      {/* Background only if NOT in fullscreen */}
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

      {/* Top-level container */}
      <div
        className={`${
          isFullscreen ? 'w-full h-screen' : 'container mx-auto px-6'
        } relative z-10`}
      >
        {!isFullscreen ? (
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl lg:text-6xl font-bold text-primary mb-6">
              Autistic Intelligence Analysis
              <span className={`ml-4 ${styles['animate-float']}`}>🧠</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading max-w-2xl mx-auto mb-4">
              When “slightly obsessed with charts” is actually a superpower!
              <br />
              We’ll analyze every single detail.
            </p>
            <PersonalitySelector currentPersonality={personality} onSelect={handlePersonalityChange} />
            <button
              onClick={() => setIsFullscreen(true)}
              className={`${styles['chat-button']} mt-4`}
            >
              Enter Fullscreen Mode 📊
            </button>
          </div>
        ) : (
          // Fullscreen top bar
          <div className="flex justify-between items-center py-2 px-4 bg-white border-b border-primary/20">
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
              className="text-primary hover:text-primary/80 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main chat container */}
        <div className={`${isFullscreen ? 'w-full' : 'max-w-4xl mx-auto'}`}>
          <div
            className={`${styles['chat-container']} ${
              isFullscreen ? styles['chat-fullscreen'] : 'p-6'
            } ${isFullscreen ? 'fullscreen' : ''}`}
          >
            {/* Contract Input */}
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

            {/* Token Stats */}
            {analysisData && <TokenStats data={analysisData.tokenData} />}

            {/* Inline Chart Example */}
            {analysisData && (
              <div className="mb-6">
                <ChartComponent data={analysisData.tokenData.chart.prices} />
              </div>
            )}

            {/* Messages */}
            <div
              className={`${styles['chat-messages']} ${
                isFullscreen ? 'h-[calc(100vh-200px)]' : ''
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

            {/* Input Box */}
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

      {/* Floating Chart Window */}
      {showChart && analysisData && (
        <ChartWindow
          data={analysisData.tokenData.chart.prices}
          onClose={() => setShowChart(false)}
          onMinimize={() => setShowChart(false)}
        />
      )}
    </section>
  );
};

export default AI;
