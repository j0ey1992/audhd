import React, { useState } from 'react';

const patterns = [
    {
        name: 'Double Bottom',
        confidence: 98.7,
        description: 'A reversal pattern that looks exactly like your portfolio performance!',
        emoji: '📉📈',
        indicators: ['RSI Divergence', 'Volume Profile', 'MACD Cross']
    },
    {
        name: 'Head and Shoulders',
        confidence: 87.5,
        description: 'Like your posture after 12 hours of chart watching!',
        emoji: '👤',
        indicators: ['Moving Averages', 'Volume Analysis', 'Trend Lines']
    },
    {
        name: 'Bull Flag',
        confidence: 94.2,
        description: 'The only flag we pledge allegiance to!',
        emoji: '🚩',
        indicators: ['Price Channels', 'Momentum', 'Support Levels']
    }
];

const technicalIndicators = [
    'RSI', 'MACD', 'Bollinger Bands', 'Stochastic', 'ATR',
    'OBV', 'CMF', 'EMA', 'SMA', 'Ichimoku Cloud'
];

function PatternScanner() {
    const [activePattern, setActivePattern] = useState(null);
    const [scanning, setScanning] = useState(false);

    const startScan = (pattern) => {
        setScanning(true);
        setActivePattern(pattern);
        // Simulate scanning process
        setTimeout(() => {
            setScanning(false);
        }, 2000);
    };

    return (
        <section className="relative py-24 bg-background overflow-hidden" id="pattern-scanner">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Advanced Pattern Scanner
                        <span className="animate-bounce">🔍</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Finding patterns in pure noise since 2024!
                    </p>
                </div>

                {/* Patterns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {patterns.map((pattern) => (
                        <div 
                            key={pattern.name}
                            className="bg-surface/95 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl animate-float">{pattern.emoji}</span>
                                <h3 className="text-2xl font-bold text-primary">{pattern.name}</h3>
                            </div>
                            
                            <p className="text-lg text-text-secondary mb-6">{pattern.description}</p>
                            
                            {/* Confidence Meter */}
                            <div className="space-y-2 mb-6">
                                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        style={{ width: `${pattern.confidence}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-text-secondary">
                                    {pattern.confidence}% Confidence
                                </span>
                            </div>

                            {/* Indicators */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {pattern.indicators.map((indicator) => (
                                    <span 
                                        key={indicator}
                                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                                    >
                                        {indicator}
                                    </span>
                                ))}
                            </div>

                            {/* Scan Button */}
                            <button
                                className={`w-full bg-gradient-to-r from-primary to-secondary text-surface px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                                    scanning && activePattern === pattern ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
                                }`}
                                onClick={() => startScan(pattern)}
                                disabled={scanning && activePattern === pattern}
                            >
                                {scanning && activePattern === pattern ? (
                                    <>Scanning... <span className="animate-spin">🔄</span></>
                                ) : (
                                    <>Scan Pattern <span className="animate-bounce">🎯</span></>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Indicator Cloud */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-primary mb-8 text-center">
                        Active Technical Indicators
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {technicalIndicators.map((indicator) => (
                            <span 
                                key={indicator}
                                className="px-4 py-2 bg-surface/95 border border-primary/20 rounded-full text-text-secondary hover:border-primary/40 transition-all duration-300"
                            >
                                {indicator}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Obsession Meter */}
                <div className="max-w-2xl mx-auto bg-surface/95 rounded-3xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                        Pattern Recognition Obsession Level
                    </h3>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary animate-fill-level" style={{ width: '95%' }}></div>
                    </div>
                    <div className="text-2xl font-bold text-primary text-center">
                        95% Obsessed
                    </div>
                    <p className="mt-4 text-lg text-text-secondary text-center">
                        Warning: May cause excessive chart watching and social isolation!
                    </p>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,26,26,0.03)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-[60px] top-1/4 -left-1/4 animate-float"></div>
                <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-[60px] bottom-1/4 -right-1/4 animate-float-reverse"></div>
            </div>
        </section>
    );
}

export default PatternScanner;