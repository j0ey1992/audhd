import React from 'react';

const features = [
    {
        title: 'The Builder! 🏗️',
        description: 'I LOVE building things! Give me an idea and watch me disappear into my coding cave for days. I\'ll emerge with not just what you asked for, but also 17 other features I thought would be "absolutely essential" (and they usually are!).',
        emoji: '👨‍💻',
        color: 'from-primary/20 to-accent/20'
    },
    {
        title: 'Web3 Detective! 🔍',
        description: 'Reading the blockchain is my superpower! I\'ve spent countless nights following transaction trails, connecting wallets, and uncovering patterns that others miss. It\'s like being a digital Sherlock Holmes, but with more coffee and less sleep!',
        emoji: '🕵️',
        color: 'bg-accent/10'
    },
    {
        title: 'Hyperfocus Master! 🎯',
        description: 'When something catches my interest, I become OBSESSED. I\'ll learn everything about it, create spreadsheets, write documentation, and then... suddenly find a new obsession! But hey, each hyperfocus phase leaves behind something amazing!',
        emoji: '🧠',
        color: 'bg-secondary/10'
    },
    {
        title: 'Pattern Hunter! 🌐',
        description: 'I see patterns EVERYWHERE in Web3! From trading patterns to smart contract similarities, my brain is constantly connecting dots that others don\'t even notice. Sometimes these connections lead to incredible discoveries!',
        emoji: '🎯',
        color: 'bg-primary/10'
    }
];

const hyperfixations = [
    {
        title: 'Smart Contract Analyzer! 🔍',
        description: 'Building the ULTIMATE smart contract analysis tool that thinks like an autistic brain! It reads code 17 times, color-codes EVERYTHING, and finds those tiny details everyone else misses. It\'s like having my pattern recognition powers, but automated!',
        emoji: '🤖',
        intensity: 'Maximum Hyperfocus'
    },
    {
        title: 'Portfolio AI Assistant! 📊',
        description: 'Creating a portfolio manager that makes sense to OUR brains! It has 47 different visualization options, tracks patterns most people don\'t even know exist, and yes, it comes with rainbow charts! Because who said finance can\'t be colorful?',
        emoji: '🎨',
        intensity: 'Visual Flow'
    },
    {
        title: 'AI Chat Companions! 💬',
        description: 'Deploying mini-mes across Discord and Telegram! These bots have memorized EVERY token launch since 2020, analyze sentiment patterns, and can info-dump about blockchain architecture at 3 AM. They\'re basically digital versions of my hyperfixation powers!',
        emoji: '🤖',
        intensity: 'Lightning Speed'
    },
    {
        title: 'Meme Psychology Engine! 🎭',
        description: 'Teaching AI to understand meme token psychology! It tracks wallet behaviors, predicts FOMO moments, and even understands why someone would put their life savings into a token with a dog on it. It\'s like having a PhD in memeconomics!',
        emoji: '🧠',
        intensity: 'Pattern Master'
    },
    {
        title: 'Wallet Detective System! 🔎',
        description: 'Building the most detailed wallet tagging system ever! It can tell if someone\'s a diamond-handed hodler or a paper-handed panic seller from their first transaction. Because I spent way too much time categorizing wallet behaviors, and now you get to benefit from my obsession!',
        emoji: '🏷️',
        intensity: 'Deep Analysis'
    }
];

function Features() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-background via-surface to-background overflow-hidden">
            {/* Modern grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--text)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--text)/0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--surface)/0.8),transparent_70%)]"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="font-heading text-5xl lg:text-6xl font-bold text-primary mb-6">
                        Neurodivergent Trading Powers!
                        <span className="ml-4">🧠✨</span>
                    </h2>
                    <p className="text-xl text-text-secondary font-heading max-w-2xl mx-auto">
                        When your brain works differently, you see opportunities others miss! 
                        (And yes, I've categorized these opportunities into 7 different spreadsheets!)
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative bg-surface/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-primary/20 hover:border-primary transition-all duration-300 hover:bg-surface/60"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl">{feature.emoji}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed font-heading">{feature.description}</p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Current Hyperfocuses */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-4">
                            Current Hyperfixations! 🎯
                        </h3>
                        <p className="text-xl text-text-secondary font-heading">
                            When we say "deep dive," we mean "forgot to sleep for 3 days because THIS IS SO INTERESTING!"
                            <br/>
                            <span className="text-sm">(Don't worry, we eventually remembered to eat... usually! 😅)</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {hyperfixations.map((fixation) => (
                            <div
                                key={fixation.title}
                                className="group relative bg-surface/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-primary/20 hover:border-primary transition-all duration-300 hover:bg-surface/60"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl">{fixation.emoji}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{fixation.title}</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed font-heading mb-4">{fixation.description}</p>
                                        
                                        {/* Intensity Meter */}
                                        <div className="mt-2">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-xs font-heading text-text-secondary">Focus Level:</span>
                                                <span className="text-xs font-heading font-bold text-accent">{fixation.intensity}</span>
                                            </div>
                                            <div className="h-1 w-full bg-primary/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary/20 to-accent/20 transition-all duration-500"
                                                    style={{
                                                        width:
                                                            fixation.intensity === 'Maximum Hyperfocus' ? '100%' :
                                                            fixation.intensity === 'Lightning Brain' ? '85%' :
                                                            fixation.intensity === 'Visual Mastery' ? '70%' :
                                                            '40%'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;
