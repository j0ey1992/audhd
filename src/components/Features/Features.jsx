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
        title: 'Unpublished Websites',
        description: 'Building 47 crypto analysis sites that will never see the light of day.',
        emoji: '🌐',
        intensity: 'Maximum'
    },
    {
        title: 'Meme Coin Ideas',
        description: 'Creating 30+ meme coin concepts but never actually launching any.',
        emoji: '💡',
        intensity: 'Obsessive'
    },
    {
        title: 'Lost Vape Hunt',
        description: 'Spending hours searching for my vape instead of trading.',
        emoji: '🔍',
        intensity: 'Frequent'
    },
    {
        title: 'AI Crypto Analysis',
        description: 'Training AI models to predict crypto prices with 0.0001% accuracy.',
        emoji: '🤖',
        intensity: 'Extreme'
    },
    {
        title: 'Crypto Meme Analysis',
        description: 'Spending 12 hours analyzing the hidden meanings behind doge memes from 2014.',
        emoji: '🐶',
        intensity: 'Extreme'
    },
    {
        title: 'Whitepaper Deep Dives',
        description: 'Reading every whitepaper ever written, even for dead coins.',
        emoji: '📜',
        intensity: 'High'
    }
];

function Features() {
    return (
        <section className="relative py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4 bg-surface px-8 py-4 rounded-2xl border border-primary/20 shadow-sm">
                        Why Choose Autistic Investor?
                        <span>🧠</span>
                    </h2>
                    <p className="text-xl text-text-secondary bg-surface px-6 py-3 rounded-xl border border-accent/20 shadow-sm inline-block">
                        Because nobody analyzes charts like we do!
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature) => (
                        <div 
                            key={feature.title}
                            className="bg-surface p-8 rounded-2xl border border-primary/20 shadow-sm"
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-surface rounded-2xl border border-primary/20 mb-6 relative overflow-hidden">
                                <span className="text-3xl relative z-10">{feature.emoji}</span>
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-50`}></div>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                            <p className="text-lg text-text-secondary leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Pattern Analysis */}
                {/* Current Hyperfocuses */}
                {/* Current Hyperfocuses */}
                <div className="mt-24">
                    <h3 className="text-4xl font-bold text-primary mb-12 text-center bg-gradient-to-r from-primary/10 to-accent/10 px-8 py-6 rounded-2xl border border-primary/20 shadow-lg inline-block">
                        🧠 Current Hyperfocuses
                        <span className="block text-lg font-normal mt-2 text-text-secondary">What we're obsessing over right now!</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hyperfixations.map((fixation) => (
                            <div
                                key={fixation.title}
                                className="group bg-surface p-8 rounded-3xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl border border-primary/20">
                                        <span className="text-4xl">{fixation.emoji}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-primary">{fixation.title}</h4>
                                </div>
                                <p className="text-text-secondary mb-6 text-lg leading-relaxed">{fixation.description}</p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{
                                    backgroundColor:
                                        fixation.intensity === 'Maximum' ? '#fecaca' :
                                        fixation.intensity === 'Extreme' ? '#fed7aa' :
                                        fixation.intensity === 'Obsessive' ? '#fde68a' :
                                        fixation.intensity === 'High' ? '#bbf7d0' :
                                        '#bfdbfe'
                                }}>
                                    <span className="w-2 h-2 rounded-full animate-pulse" style={{
                                        backgroundColor:
                                            fixation.intensity === 'Maximum' ? '#dc2626' :
                                            fixation.intensity === 'Extreme' ? '#ea580c' :
                                            fixation.intensity === 'Obsessive' ? '#d97706' :
                                            fixation.intensity === 'High' ? '#16a34a' :
                                            '#2563eb'
                                    }}></span>
                                    Intensity: <span className="font-bold">{fixation.intensity}</span>
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