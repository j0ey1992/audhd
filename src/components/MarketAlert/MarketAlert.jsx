import React, { useState } from 'react';

const alerts = [
    {
        type: 'Pattern Alert',
        description: 'Triple super-mega-hyper bullish divergence detected on the 1-second chart!',
        confidence: 99.9,
        timeframe: '1s',
        emoji: '📊'
    },
    {
        type: 'Volume Analysis',
        description: 'Unusual volume spike detected! Someone bought 0.0001 tokens!',
        confidence: 87.5,
        timeframe: '1m',
        emoji: '📈'
    },
    {
        type: 'Indicator Alert',
        description: 'All 42 indicators aligned for the first time since the big bang!',
        confidence: 95.2,
        timeframe: '5m',
        emoji: '🎯'
    }
];

const marketConditions = [
    {
        name: 'Market Sentiment',
        value: 'Maximum Autism',
        description: 'Everyone is analyzing charts instead of touching grass',
        icon: '🧠'
    },
    {
        name: 'Pattern Clarity',
        value: '420%',
        description: 'Finding patterns in pure noise with unprecedented accuracy',
        icon: '👀'
    },
    {
        name: 'Social Awareness',
        value: '0%',
        description: 'Too busy watching charts to notice anything else',
        icon: '🤖'
    }
];

function MarketAlert() {
    const [selectedAlert, setSelectedAlert] = useState(null);

    return (
        <section className="relative py-24 bg-background overflow-hidden" id="market-alert">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Hyper-Alert System
                        <span className="animate-bounce">⚠️</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Never miss a pattern again! (Even the ones that don't exist)
                    </p>
                </div>

                {/* Alerts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {alerts.map((alert, index) => (
                        <div
                            key={alert.type}
                            className={`bg-surface/95 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer ${
                                selectedAlert === index ? 'scale-105 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedAlert(index)}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl animate-float">{alert.emoji}</span>
                                <h3 className="text-2xl font-bold text-primary">{alert.type}</h3>
                            </div>
                            <p className="text-lg text-text-secondary mb-6">{alert.description}</p>
                            
                            {/* Confidence Meter */}
                            <div className="space-y-2">
                                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        style={{ width: `${alert.confidence}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-text-secondary">
                                    {alert.confidence}% Confidence
                                </span>
                            </div>

                            {/* Timeframe */}
                            <div className="mt-4 text-sm text-text-secondary">
                                Timeframe: {alert.timeframe}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Market Conditions */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-primary mb-8 text-center">
                        Current Market Conditions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {marketConditions.map((condition) => (
                            <div 
                                key={condition.name}
                                className="bg-surface/95 rounded-3xl p-8 border border-primary/20"
                            >
                                <div className="text-4xl mb-4 animate-float">{condition.icon}</div>
                                <h4 className="text-xl font-bold text-primary mb-2">{condition.name}</h4>
                                <div className="text-3xl font-bold text-primary mb-4">{condition.value}</div>
                                <p className="text-lg text-text-secondary">{condition.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alert Settings */}
                <div className="max-w-2xl mx-auto bg-surface/95 rounded-3xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                        Alert Sensitivity
                    </h3>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary animate-fill-level"></div>
                    </div>
                    <div className="text-2xl font-bold text-primary text-center">
                        Maximum Pattern Recognition Mode Engaged!
                    </div>
                    <p className="mt-4 text-lg text-text-secondary text-center">
                        Warning: May cause excessive notifications about non-existent patterns!
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

export default MarketAlert;