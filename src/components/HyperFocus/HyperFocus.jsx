import React, { useState } from 'react';

const focusStats = [
    {
        title: 'Hours Staring at Charts',
        value: '24/7',
        description: 'Sleep is for the weak! Charts never sleep, neither do we!',
        emoji: '👀'
    },
    {
        title: 'Pattern Recognition Level',
        value: '∞',
        description: 'Finding triangles in random noise since 2024',
        emoji: '📊'
    },
    {
        title: 'Social Life Status',
        value: '404',
        description: 'Error: Social life not found (too busy analyzing charts)',
        emoji: '🤖'
    },
    {
        title: 'Focus Intensity',
        value: '9001',
        description: 'It\'s over 9000! Power level: Maximum Autism',
        emoji: '🎯'
    }
];

const hyperfixations = [
    {
        name: 'Chart Patterns',
        intensity: 98,
        description: 'Every candle tells a story, and we\'ve memorized them all!',
        icon: '📈'
    },
    {
        name: 'Technical Indicators',
        intensity: 95,
        description: 'Running 42 indicators simultaneously for maximum analysis paralysis',
        icon: '🔬'
    },
    {
        name: 'Price Action',
        intensity: 97,
        description: 'Watching every tick like it\'s the season finale',
        icon: '📊'
    },
    {
        name: 'Market Psychology',
        intensity: 99,
        description: 'Understanding charts better than human emotions',
        icon: '🧠'
    }
];

function HyperFocus() {
    const [activeHyperfixation, setActiveHyperfixation] = useState(null);

    return (
        <section className="relative py-24 bg-surface/95 overflow-hidden" id="hyperfocus">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Maximum Focus Mode
                        <span className="animate-bounce">🎯</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        When autism meets market analysis!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {focusStats.map((stat, index) => (
                        <div 
                            key={stat.title}
                            className="bg-surface/95 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-4xl mb-4 animate-float">{stat.emoji}</div>
                            <h3 className="text-xl font-bold text-primary mb-2">{stat.title}</h3>
                            <div className="text-3xl font-bold text-primary mb-4">{stat.value}</div>
                            <p className="text-lg text-text-secondary">{stat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Hyperfixations */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-primary mb-8 text-center">
                        Current Hyperfixations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hyperfixations.map((fix, index) => (
                            <div
                                key={fix.name}
                                className={`bg-surface/95 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer ${
                                    activeHyperfixation === index ? 'scale-105 shadow-lg' : ''
                                }`}
                                onClick={() => setActiveHyperfixation(index)}
                            >
                                <div className="text-4xl mb-4 animate-float">{fix.icon}</div>
                                <h4 className="text-xl font-bold text-primary mb-4">{fix.name}</h4>
                                <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-2">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        style={{ width: `${fix.intensity}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-text-secondary">
                                    {fix.intensity}% Intensity
                                </span>
                                <p className="mt-4 text-lg text-text-secondary">{fix.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Focus Meter */}
                <div className="max-w-2xl mx-auto bg-surface/95 rounded-3xl p-8 border border-primary/20">
                    <div className="text-center">
                        <div className="text-xl text-text-secondary mb-2">
                            Current Focus Level:
                        </div>
                        <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary animate-fill-level"></div>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                            MAXIMUM AUTISM
                        </div>
                        <p className="mt-4 text-lg text-text-secondary">
                            Warning: Side effects may include missing social cues, forgetting to eat,
                            and explaining chart patterns to random strangers!
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Base Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,26,26,0.1)_0%,transparent_70%)]"></div>
                
                {/* Animated Chart Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 animate-move-grid"></div>
                
                {/* Moving Market Data Lines */}
                <div className="absolute inset-0">
                    <div className="absolute w-[200%] h-full bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:40px_100%] animate-move-lines"></div>
                    <div className="absolute w-full h-[200%] bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_40px] animate-move-lines-vertical"></div>
                </div>
                
                {/* Glowing Elements */}
                <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] top-1/4 -left-1/4 animate-float"></div>
                <div className="absolute w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[100px] bottom-1/4 -right-1/4 animate-float-reverse"></div>
                
                {/* Floating Chart Elements */}
                <div className="absolute w-24 h-24 bg-[url('/public/wojak_studio.png')] bg-contain bg-no-repeat opacity-20 top-[10%] left-[15%] animate-float-slow"></div>
                <div className="absolute w-32 h-32 bg-[url('/public/wojak_studio.png')] bg-contain bg-no-repeat opacity-15 bottom-[20%] right-[10%] animate-float-reverse-slow"></div>
            </div>
        </section>
    );
}

export default HyperFocus;