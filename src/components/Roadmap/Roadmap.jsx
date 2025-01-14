import React from 'react';

const phases = [
    {
        phase: 'Phase 1: Initial Obsession',
        title: 'Pattern Recognition Overload',
        items: [
            'Launch token on Cronos chain',
            'Memorize every 1-minute candle since 2020',
            'Create 500-page whitepaper about chart patterns',
            'Develop advanced hyperfixation techniques'
        ],
        emoji: '🔍'
    },
    {
        phase: 'Phase 2: Deep Analysis',
        title: 'Technical Analysis Mastery',
        items: [
            'Launch AI-powered pattern scanner',
            'Create 24/7 chart watching community',
            'Implement social awkwardness training',
            'Deploy advanced Fibonacci calculator'
        ],
        emoji: '📊'
    },
    {
        phase: 'Phase 3: Peak Autism',
        title: 'Maximum Pattern Recognition',
        items: [
            'Release proprietary indicator suite',
            'Host weekly 12-hour chart analysis sessions',
            'Launch pattern recognition competitions',
            'Develop trading terminal for autists'
        ],
        emoji: '🧠'
    },
    {
        phase: 'Phase 4: Market Mastery',
        title: 'Complete Trading Enlightenment',
        items: [
            'Achieve 1000x leverage trading',
            'Predict market moves with 0.001% accuracy',
            'Create the ultimate trading algorithm',
            'Finally touch grass (maybe)'
        ],
        emoji: '🚀'
    }
];

function Roadmap() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-background via-surface/50 to-background overflow-hidden" id="roadmap">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Development Roadmap
                        <span className="animate-bounce">📈</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Our path to complete market obsession!
                    </p>
                </div>

                {/* Timeline */}
                {/* Enhanced Timeline */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Animated Timeline Line */}
                    <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 animate-pulse-line"></div>
                    
                    {phases.map((phase, index) => (
                        <div
                            key={phase.phase}
                            className={`relative mb-16 w-full md:w-[45%] ${
                                index % 2 === 0 ? 'md:mr-[55%]' : 'md:ml-[55%]'
                            }`}
                        >
                            {/* Phase Connector */}
                            <div className="absolute top-8 -left-4 md:left-auto md:-right-4 w-8 h-8 rounded-full bg-surface border-2 border-primary/20 flex items-center justify-center z-10">
                                <div className="w-4 h-4 bg-primary/50 rounded-full animate-pulse"></div>
                            </div>

                            {/* Phase Card */}
                            <div className="relative bg-surface/95 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 shadow-lg group">
                                {/* Progress Indicator */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-surface px-4 py-2 rounded-full border border-primary/20 text-sm font-medium text-primary">
                                    {index === 0 && 'In Progress'}
                                    {index > 0 && 'Upcoming'}
                                </div>

                                {/* Phase Header */}
                                <div className={`flex items-center gap-6 mb-6 ${
                                    index % 2 === 0 ? 'flex-row-reverse' : ''
                                }`}>
                                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                                        <span className="text-4xl animate-float">{phase.emoji}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">{phase.phase}</h3>
                                        <h4 className="text-xl font-semibold text-primary/80">{phase.title}</h4>
                                    </div>
                                </div>

                                {/* Phase Items */}
                                <ul className="space-y-3">
                                    {phase.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="flex items-start gap-3 text-lg text-text-secondary hover:text-primary transition-colors duration-200"
                                        >
                                            <span className="w-6 h-6 flex items-center justify-center bg-surface border border-primary/20 rounded-full text-sm text-primary mt-1">
                                                {itemIndex + 1}
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Progress Bar */}
                                <div className="mt-6">
                                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                            style={{ width: `${(index + 1) * 25}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Enhanced Progress Bar */}
                <div className="max-w-4xl mx-auto mt-16 space-y-4">
                    {/* Progress Bar Container */}
                    <div className="h-4 bg-surface rounded-full overflow-hidden border border-primary/20 relative">
                        {/* Glowing Progress */}
                        <div className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/50 to-emerald-500/50 animate-progress-glow"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-500/20 animate-progress-pulse"></div>
                        </div>
                        
                        {/* Percentage Indicator */}
                        <div className="absolute inset-0 flex items-center justify-end pr-4">
                            <span className="text-xs font-bold text-surface bg-lime-400/90 px-2 py-1 rounded-full shadow-sm">
                                <span className="animate-count-up" data-target="100">0</span>%
                            </span>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-primary/20">
                            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-lime-400">Analyzing...</span>
                            <span className="animate-spin">🌀</span>
                        </div>
                    </div>
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

export default Roadmap;