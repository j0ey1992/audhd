import React from 'react';
import styles from '../AI.module.css';
import QuickActions from './QuickActions';
import { personalities } from '../services/personalities';

const formatMessage = (text) => {
    if (!text) return '';
    
    // Format technical terms with special styling
    const formatTechnicalTerms = (part) => {
        const terms = [
            'RSI', 'MACD', 'SMA', 'EMA', 'Double Bottom', 'Double Top',
            'Head and Shoulders', 'Ascending Triangle', 'Descending Triangle',
            'Bull Flag', 'Bear Flag'
        ];
        
        let formattedPart = part;
        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'g');
            formattedPart = formattedPart.replace(regex, `**$1**`);
        });
        return formattedPart;
    };

    // Split by asterisk formatting and technical terms
    return text.split(/(\*[^*]+\*)/).map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            return (
                <span key={index} className="italic text-primary/80">
                    {part.slice(1, -1)}
                </span>
            );
        }
        
        const formattedPart = formatTechnicalTerms(part);
        return formattedPart.split(/(\*\*[^*]+\*\*)/).map((subPart, subIndex) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                return (
                    <span key={`${index}-${subIndex}`} className="font-bold text-primary">
                        {subPart.slice(2, -2)}
                    </span>
                );
            }
            return subPart;
        });
    });
};

const formatChart = (miniChart) => {
    if (!miniChart || typeof miniChart !== 'object') return null;

    // If miniChart is an object with prices array
    if (Array.isArray(miniChart.prices)) {
        const prices = miniChart.prices;
        if (prices.length === 0) return null;

        const latestPrice = prices[prices.length - 1].value;
        const earliestPrice = prices[0].value;
        const priceChange = ((latestPrice - earliestPrice) / earliestPrice) * 100;
        const trend = priceChange >= 0 ? 'BULLISH' : 'BEARISH';

        const chartText = `${trend} TREND\n\nCurrent: $${latestPrice.toFixed(8)}\nChange: ${priceChange.toFixed(2)}%\nSupport: $${miniChart.support?.toFixed(8) || '0.00'}\nResistance: $${miniChart.resistance?.toFixed(8) || '0.00'}`;

        return chartText.split('\n').map((line, index) => {
            if (line.includes('BULLISH')) {
                return <div key={index} className="text-green-500">{line}</div>;
            }
            if (line.includes('BEARISH')) {
                return <div key={index} className="text-red-500">{line}</div>;
            }
            if (line.includes('Current') || line.includes('Support') || line.includes('Resistance')) {
                return <div key={index} className="text-blue-500">{line}</div>;
            }
            return <div key={index}>{line}</div>;
        });
    }

    // Fallback for string-based chart data
    if (typeof miniChart === 'string') {
        return miniChart.split('\n').map((line, index) => {
            if (line.includes('BULLISH')) {
                return <div key={index} className="text-green-500">{line}</div>;
            }
            if (line.includes('BEARISH')) {
                return <div key={index} className="text-red-500">{line}</div>;
            }
            if (line.includes('Current') || line.includes('Support') || line.includes('Resistance')) {
                return <div key={index} className="text-blue-500">{line}</div>;
            }
            return <div key={index}>{line}</div>;
        });
    }

    return null;
};

const TechnicalIndicators = ({ indicators }) => {
    if (!indicators || typeof indicators !== 'object') return null;

    // Get the latest values from the arrays
    const getLatestValue = (arr) => {
        if (Array.isArray(arr) && arr.length > 0) {
            return arr[arr.length - 1];
        }
        return null;
    };

    // Extract latest values
    const rsiValue = indicators.rsi ? getLatestValue(indicators.rsi) : null;
    const macdValue = indicators.macd?.histogram ? getLatestValue(indicators.macd.histogram) : null;
    const smaValue = indicators.sma?.sma20 ? getLatestValue(indicators.sma.sma20) : null;

    if (!rsiValue && !macdValue && !smaValue) return null;

    return (
        <div className="mt-2 p-2 bg-surface/10 rounded-lg">
            <h4 className="font-bold text-primary mb-1">Technical Indicators</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
                {rsiValue !== null && (
                    <div>
                        <span className="text-text-secondary">RSI: </span>
                        <span className={rsiValue > 70 ? 'text-red-500' : rsiValue < 30 ? 'text-green-500' : ''}>
                            {typeof rsiValue === 'number' ? rsiValue.toFixed(2) : 'N/A'}
                        </span>
                    </div>
                )}
                {macdValue !== null && (
                    <div>
                        <span className="text-text-secondary">MACD: </span>
                        <span className={macdValue > 0 ? 'text-green-500' : 'text-red-500'}>
                            {typeof macdValue === 'number' ? macdValue.toFixed(4) : 'N/A'}
                        </span>
                    </div>
                )}
                {smaValue !== null && (
                    <div>
                        <span className="text-text-secondary">SMA20: </span>
                        <span>{typeof smaValue === 'number' ? smaValue.toFixed(8) : 'N/A'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const PatternConfidence = ({ pattern }) => {
    if (!pattern) return null;

    return (
        <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-grow bg-surface/20 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${pattern.confidence}%` }}
                />
            </div>
            <span className="text-sm text-text-secondary">
                {pattern.confidence.toFixed(1)}% confidence
            </span>
        </div>
    );
};

const Message = ({ message, onActionClick }) => {
    const isBot = message.type === 'bot';
    const personality = isBot ? personalities[message.personality] : null;

    return (
        <div className={`flex gap-4 ${styles['animate-fade-in']}`}>
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
                {isBot ? personality?.emoji || '📊' : '👤'}
            </div>
            <div
                className={`flex-1 ${
                    isBot ? 'bg-primary/5' : 'bg-secondary/5'
                } rounded-xl p-4`}
            >
                <p className="text-text whitespace-pre-wrap">
                    {formatMessage(message.content)}
                    {message.loading && <span className={styles['loading-dots']} />}
                </p>

                {/* Enhanced Chart Display */}
                {message.miniChart && (
                    <pre className={`${styles['mini-chart']} mt-2`}>
                        {formatChart(message.miniChart)}
                    </pre>
                )}

                {/* Technical Indicators */}
                {message.indicators && (
                    <TechnicalIndicators indicators={message.indicators} />
                )}

                {/* Pattern Confidence */}
                {message.pattern && (
                    <PatternConfidence pattern={message.pattern} />
                )}

                {/* Quick Actions */}
                {isBot && !message.loading && (
                    <QuickActions
                        onActionClick={onActionClick}
                        showPriceAction={message.content.toLowerCase().includes('price')}
                        showVolumeAction={message.content.toLowerCase().includes('volume')}
                        showLiquidityAction={message.content.toLowerCase().includes('liquidity')}
                        showPatternAction={message.content.toLowerCase().includes('pattern')}
                        personality={message.personality}
                    />
                )}

                {/* Timeframe Indicator */}
                {message.timeframe && (
                    <div className="mt-2 text-xs text-text-secondary">
                        Analysis timeframe: {message.timeframe}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
