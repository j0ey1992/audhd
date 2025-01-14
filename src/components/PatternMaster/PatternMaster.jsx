import React, { useState } from 'react';

const patterns = [
    {
        name: 'The Autistic Triangle',
        description: 'Three points make a triangle, but we see triangles everywhere!',
        confidence: 98.7,
        complexity: 'Extreme',
        emoji: '📐',
        traits: ['Hyperfixation Required', 'Maximum Focus', 'Pattern Overload']
    },
    {
        name: 'The Social Awkwardness Wedge',
        description: 'Like our social skills, it only goes down!',
        confidence: 94.2,
        complexity: 'High',
        emoji: '📉',
        traits: ['Zero Social Awareness', 'Pure Technical Analysis', 'Chart Obsession']
    },
    {
        name: 'The Spectrum Wave',
        description: 'When regular Elliott Waves are too neurotypical',
        confidence: 96.5,
        complexity: 'Infinite',
        emoji: '〽️',
        traits: ['Special Interest', 'Detail Fixation', 'Pattern Recognition Overload']
    }
];

const achievements = [
    {
        title: 'Pattern Savant',
        level: 'Grandmaster',
        description: 'Found patterns in random noise 1000 times',
        progress: 100,
        emoji: '🎯'
    },
    {
        title: 'Chart Whisperer',
        level: 'Legendary',
        description: 'Stared at charts for 24 hours straight',
        progress: 95,
        emoji: '👀'
    },
    {
        title: 'Technical Analyst',
        level: 'Autistic',
        description: 'Used all indicators simultaneously',
        progress: 98,
        emoji: '📊'
    }
];

function PatternMaster() {
    const [selectedPattern, setSelectedPattern] = useState(null);

    return (
        <section className="relative py-24 bg-background overflow-hidden" id="pattern-master">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Pattern Mastery Level
                        <span className="animate-bounce">🧠</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Where autism meets technical analysis!
                    </p>
                </div>

                {/* Patterns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {patterns.map((pattern, index) => (
                        <div
                            key={pattern.name}
                            className={`bg-surface/95 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer ${
                                selectedPattern === index ? 'scale-105 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedPattern(index)}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl animate-float">{pattern.emoji}</span>
                                <h3 className="text-2xl font-bold text-primary">{pattern.name}</h3>
                            </div>
                            <p className="text-lg text-text-secondary mb-6">{pattern.description}</p>
                            
                            {/* Stats */}
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-sm text-text-secondary mb-1">Confidence</span>
                                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                            style={{ width: `${pattern.confidence}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-text-secondary mt-1">
                                        {pattern.confidence}%
                                    </span>
                                </div>
                                
                                <div>
                                    <span className="block text-sm text-text-secondary">Complexity</span>
                                    <span className="text-lg font-semibold text-primary">
                                        {pattern.complexity}
                                    </span>
                                </div>
                            </div>

                            {/* Traits */}
                            <div className="flex flex-wrap gap-2 mt-6">
                                {pattern.traits.map((trait, i) => (
                                    <span 
                                        key={i}
                                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                                    >
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Achievements */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-primary mb-8 text-center">
                        Trading Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {achievements.map((achievement) => (
                            <div 
                                key={achievement.title}
                                className="bg-surface/95 rounded-3xl p-8 border border-primary/20"
                            >
                                <div className="text-4xl mb-4 animate-float">{achievement.emoji}</div>
                                <h4 className="text-xl font-bold text-primary mb-2">{achievement.title}</h4>
                                <span className="block text-sm text-text-secondary mb-2">
                                    {achievement.level}
                                </span>
                                <p className="text-lg text-text-secondary mb-4">{achievement.description}</p>
                                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        style={{ width: `${achievement.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mastery Level */}
                <div className="max-w-2xl mx-auto bg-surface/95 rounded-3xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                        Overall Pattern Recognition Level
                    </h3>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary animate-fill-level"></div>
                    </div>
                    <div className="text-2xl font-bold text-primary text-center">
                        Maximum Autism Achieved!
                    </div>
                    <p className="mt-4 text-lg text-text-secondary text-center">
                        Warning: Side effects include seeing patterns in cloud formations and tile arrangements!
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

export default PatternMaster;