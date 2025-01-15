import React from 'react';

const features = [
    {
        title: 'Autistic Pattern Power! 🧩',
        description: 'So last night at 3 AM, I noticed this INCREDIBLE pattern in the charts that nobody else saw! My brain just connects dots differently - like that time I found a correlation between DeFi protocols and pizza delivery times! (I have a 50-slide presentation about it!)',
        emoji: '🔍',
        color: 'from-primary/20 to-accent/20'
    },
    {
        title: 'ADHD Multitasking Magic! ⚡',
        description: 'Who else can watch 12 charts, read 3 whitepapers, and spot a trend reversal ALL AT ONCE? Sure, I might forget where I put my coffee (found it 3 days later in the fridge), but I caught that price movement before anyone else!',
        emoji: '👀',
        color: 'bg-accent/10'
    },
    {
        title: 'Dyslexic Visual Mastery! 🎨',
        description: 'Text-heavy analysis? Nah! I created this AMAZING visual trading system with colors, shapes, and patterns! Others might see chaos, but to me, it\'s like reading a beautiful story in charts! Want to see my rainbow-coded strategy map?',
        emoji: '📊',
        color: 'bg-secondary/10'
    },
    {
        title: 'Hyperfocus Superpower! 🚀',
        description: 'Once I start researching a project, I CANNOT STOP! Did you know I spent 16 hours straight analyzing token economics? Found 42 unique patterns! My family had to remind me to eat... but look at this BEAUTIFUL spreadsheet I made!',
        emoji: '🤓',
        color: 'bg-primary/10'
    }
];

const hyperfixations = [
    {
        title: 'Smart Contract Detective Mode! 🔍',
        description: 'My autistic attention to detail is PERFECT for this! I read every single line of code 17 times (yes, exactly 17 - it\'s the perfect number for code review!). Found a tiny detail that everyone missed! Want to see my 200-page analysis? I color-coded EVERYTHING!',
        emoji: '🤖',
        intensity: 'Maximum Hyperfocus'
    },
    {
        title: 'ADHD Market Insights! 🎯',
        description: 'You know that moment when your brain connects 15 different pieces of information at once? That\'s how I predicted the last trend! Everyone was like "How did you know?" and I\'m like "Well, let me explain my theory about how meme sentiment correlates with lunar cycles..."',
        emoji: '👛',
        intensity: 'Lightning Brain'
    },
    {
        title: 'Dyslexic Pattern Recognition! 🌈',
        description: 'Who needs traditional chart patterns when you can create your own visual system? I turned price action into a color-based pattern recognition tool! Others see random candles, I see a beautiful story unfolding in RAINBOW COLORS!',
        emoji: '⚖️',
        intensity: 'Visual Flow'
    },
    {
        title: 'Special Interest Deep Dive! 📚',
        description: 'Did you know I can name EVERY token launch from the past year? In chronological order? With their exact timestamps? I might have forgotten to eat dinner, but I created this AMAZING correlation matrix! Look at all these connections! No one\'s EVER noticed this before!',
        emoji: '📊',
        intensity: 'Full Obsession'
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
                        Neurodivergent Trading Powers!
                        <span className="ml-4">🧠✨</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-heading max-w-2xl mx-auto">
                        When your brain works differently, you see opportunities others miss! 
                        (And yes, I've categorized these opportunities into 7 different spreadsheets!)
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

                {/* Current Hyperfocuses */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-4">
                            Current Hyperfixations! 🎯
                        </h3>
                        <p className="text-xl text-gray-600 font-heading">
                            When we say "deep dive," we mean "forgot to sleep for 3 days because THIS IS SO INTERESTING!"
                            <br/>
                            <span className="text-sm">(Don't worry, we eventually remembered to eat... usually! 😅)</span>
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
                                        <span className="text-sm font-heading text-gray-600">Focus Level:</span>
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
