import React from 'react';

const features = [
    {
        title: 'Pattern Recognition',
        description: 'See patterns that don\'t exist! Our AI token combines autism-level pattern recognition with actual AI technology.',
        emoji: '🔍',
        color: 'from-primary/20 to-accent/20'
    },
    {
        title: 'Hyperfixation Mode',
        description: 'Stare at charts for 16 hours straight without blinking! Time flies when you\'re analyzing the 1-second chart.',
        emoji: '👀',
        color: 'bg-accent/10'
    },
    {
        title: 'Info Dumping',
        description: 'Share detailed technical analysis that nobody asked for! Including every indicator known to mankind.',
        emoji: '📊',
        color: 'bg-secondary/10'
    },
    {
        title: 'Social Awkwardness',
        description: 'Miss every social cue in the trading chat, but catch every hidden bullish divergence!',
        emoji: '🤓',
        color: 'bg-primary/10'
    }
];

const hyperfixations = [
    {
        title: 'AI Smart Contract Analyzer',
        description: 'Building advanced AI systems to detect vulnerabilities and optimize smart contract code.',
        emoji: '🤖',
        intensity: 'Maximum'
    },
    {
        title: 'AI Wallet Analysis',
        description: 'Using machine learning to analyze wallet behaviors and predict market movements.',
        emoji: '👛',
        intensity: 'Extreme'
    },
    {
        title: 'Risk-Reward AI',
        description: 'Developing AI models to calculate optimal risk-reward ratios for trading positions.',
        emoji: '⚖️',
        intensity: 'Obsessive'
    },
    {
        title: 'AI Chart Analysis',
        description: 'Training neural networks to identify complex patterns in crypto price charts.',
        emoji: '📊',
        intensity: 'Extreme'
    }
];

function Features() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-background via-surface to-background overflow-hidden">
            {/* Modern grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="font-heading text-5xl lg:text-6xl font-bold text-primary mb-6">
                        Why Choose Autistic Investor?
                        <span className="ml-4">🧠</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-heading max-w-2xl mx-auto">
                        Because nobody analyzes charts like we do!
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:bg-white"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 flex items-center justify-center bg-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">{feature.emoji}</span>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-primary">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed font-heading">{feature.description}</p>
                            <div className="h-1 w-0 group-hover:w-full bg-primary/10 transition-all duration-500 mt-6"></div>
                        </div>
                    ))}
                </div>

                {/* Pattern Analysis */}
                {/* Current Hyperfocuses */}
                {/* Current Hyperfocuses */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-4">
                            🧠 Current Hyperfocuses
                        </h3>
                        <p className="text-xl text-gray-600 font-heading">
                            What we're obsessing over right now!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hyperfixations.map((fixation) => (
                            <div
                                key={fixation.title}
                                className="group bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:bg-white relative overflow-hidden"
                            >

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 flex items-center justify-center bg-primary/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl">{fixation.emoji}</span>
                                    </div>
                                    <h4 className="text-xl font-heading font-bold text-primary">{fixation.title}</h4>
                                </div>
                                <p className="text-gray-600 font-heading mb-6">{fixation.description}</p>
                                
                                {/* Simplified Intensity Meter */}
                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-heading text-gray-600">Intensity:</span>
                                        <span className="text-sm font-heading font-bold text-primary">{fixation.intensity}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary/20 transition-all duration-500"
                                            style={{
                                                width:
                                                    fixation.intensity === 'Maximum' ? '100%' :
                                                    fixation.intensity === 'Extreme' ? '85%' :
                                                    fixation.intensity === 'Obsessive' ? '70%' :
                                                    fixation.intensity === 'High' ? '55%' :
                                                    '40%'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;
