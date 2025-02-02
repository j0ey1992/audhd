import React from 'react';

const phases = [
    {
        phase: 'Phase 1: Hyperfocus Launch! 🎯',
        title: 'When Special Interests Meet Crypto',
        items: [
            'Launch $AI token (after checking the code exactly 42 times because that\'s the perfect number!)',
            'Create THE MOST DETAILED documentation ever (with color-coding and animated diagrams!)',
            'Build pattern recognition system that makes our ADHD-powered multi-chart analysis even better!',
            'Develop AI that thinks as uniquely as we do (it\'s like having a neurodivergent digital friend!)'
        ],
        emoji: '🚀'
    },
    {
        phase: 'Phase 2: Pattern Power! 🧩',
        title: 'Unleashing Our Superpowers',
        items: [
            'Deploy Discord Bot that shares our excitement about market patterns (prepare for DETAILED explanations!)',
            'Create the most organized tracking system ever (with exactly 16 color categories!)',
            'Build security features using our super-detailed pattern recognition abilities',
            'Launch multi-chart analysis tools (perfect for our ADHD multi-tasking powers!)'
        ],
        emoji: '🤖'
    },
    {
        phase: 'Phase 3: Deep Dive Time! 🌊',
        title: 'Maximum Analysis Mode',
        items: [
            'Release our special contract analyzer (warning: may include VERY excited explanations about code patterns)',
            'Create visual trading tools for our dyslexic traders (who needs numbers when you have colors?)',
            'Build the most detailed portfolio tracker ever (I spent 3 days organizing the UI... it\'s perfect!)',
            'Launch pattern-based risk assessment (with 27-point verification system!)'
        ],
        emoji: '🧠'
    },
    {
        phase: 'Phase 4: Community Expansion! 💫',
        title: 'Building Our Neurodiverse Family',
        items: [
            'Host hyper-focused coding sessions (with scheduled snack breaks because we forget to eat!)',
            'Create the most inclusive trading platform ever (stim-friendly UI included!)',
            'Launch educational content about trading with different brain wiring (prepare for DETAILED explanations)',
            'Build sensory-friendly trading tools (with dark mode that\'s ACTUALLY dark!)'
        ],
        emoji: '🌈'
    }
];

function Roadmap() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-background via-surface/50 to-background overflow-hidden" id="roadmap">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Our Master Plan! 
                        <span className="animate-bounce">🎯</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Our perfectly organized roadmap (color-coded, triple-checked, and reorganized exactly 17 times!)
                        <br/>
                        <span className="text-lg">(Warning: Contains excessive enthusiasm and random fun facts about crypto patterns! 🤓)</span>
                    </p>
                </div>

                {/* Timeline */}
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
                            <div className="relative bg-surface/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-primary/20 hover:border-primary transition-all duration-300 hover:bg-surface/60 group">
                                {/* Progress Indicator */}
                                <div className="absolute -top-3 right-4 bg-surface/60 px-3 py-1 rounded-full text-xs font-medium text-primary border border-primary/10">
                                    {index === 0 && 'In Progress (42.7% complete - yes, exactly 42.7%!)'}
                                    {index > 0 && 'Coming Soon (SO excited to share more!)'}
                                </div>

                                {/* Phase Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl">{phase.emoji}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-heading font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">{phase.phase}</h3>
                                        <h4 className="text-sm font-heading text-primary/80">{phase.title}</h4>
                                    </div>
                                </div>

                                {/* Phase Items */}
                                <ul className="space-y-2 pl-14">
                                    {phase.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="flex items-start gap-2 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200"
                                        >
                                            <span className="w-5 h-5 flex items-center justify-center bg-primary/5 rounded-full text-xs text-primary mt-0.5 flex-shrink-0">
                                                {itemIndex + 1}
                                            </span>
                                            <span className="flex-1">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Progress Bar */}
                                <div className="mt-4 pl-14">
                                    <div className="h-1 bg-primary/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary/20 to-accent/20 transition-all duration-500"
                                            style={{ width: index === 0 ? '42.7%' : '0%' }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Progress Bar */}
                <div className="max-w-4xl mx-auto mt-16 space-y-4">
                    {/* Progress Bar Container */}
                    <div className="h-4 bg-surface rounded-full overflow-hidden border border-primary/20 relative">
                        {/* Glowing Progress */}
                        <div className="h-full w-[42.7%] bg-gradient-to-r from-accent to-secondary rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-secondary/50 animate-progress-glow"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 animate-progress-pulse"></div>
                        </div>
                        
                        {/* Percentage Indicator */}
                        <div className="absolute inset-0 flex items-center justify-end pr-4">
                            <span className="text-xs font-bold text-surface bg-accent/90 px-2 py-1 rounded-full shadow-sm">
                                42.7%
                            </span>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-primary/20">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-accent">
                                Combining ADHD hyperfocus, autistic pattern recognition, and dyslexic visual thinking...
                            </span>
                            <span className="animate-spin">🧠</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgb(var(--text)/0.03)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--text)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--text)/0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-[60px] top-1/4 -left-1/4 animate-float"></div>
                <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-[60px] bottom-1/4 -right-1/4 animate-float-reverse"></div>
            </div>
        </section>
    );
}

export default Roadmap;
