import React from 'react';

function NeurodiversityAwareness() {
    const features = [
        {
            icon: '🧠',
            title: 'Brain Diversity',
            description: 'Like different blockchain protocols - each has unique strengths',
            color: 'from-primary/20 to-primary/10',
            details: 'Different cognitive styles create diverse solutions in blockchain development'
        },
        {
            icon: '💎',
            title: 'Hidden Gems',
            description: 'Neurodivergent minds often spot 100x opportunities',
            color: 'from-secondary/20 to-secondary/10',
            details: 'Exceptional at identifying undervalued projects and opportunities'
        },
        {
            icon: '📈',
            title: 'Pattern Pros',
            description: 'Natural chart readers & system thinkers',
            color: 'from-accent/20 to-accent/10',
            details: 'Excel at analyzing complex data patterns in crypto markets'
        },
        {
            icon: '🦄',
            title: 'Crypto Innovators',
            description: 'Many top builders are neurodivergent',
            color: 'from-primary/20 to-secondary/10',
            details: 'Unique perspectives drive innovation in DeFi, NFTs, and blockchain tech'
        }
    ];

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary mb-4">
                        Neurodiversity in Web3
                    </h2>
                    <div className="bg-surface/95 backdrop-blur-sm rounded-xl p-6 border border-primary/20 text-left">
                        <p className="text-lg text-text-secondary mb-4">
                            Just like blockchain has different protocols (EVM, Cosmos, etc.), human brains work in different ways. 
                            This is called neurodiversity - and it's especially common in crypto!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">🧠 Autism in Crypto</h3>
                                <p className="text-text-secondary">
                                    - Deep focus on special interests (like blockchain tech)
                                    - Pattern recognition for market trends
                                    - Attention to detail for smart contracts
                                    - Direct communication style
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">⚡ ADHD in Web3</h3>
                                <p className="text-text-secondary">
                                    - Hyperfocus during market volatility
                                    - Creative problem-solving
                                    - Rapid idea generation
                                    - Thrives in fast-paced environments
                                </p>
                            </div>
                        </div>
                        <p className="text-text-secondary mt-4 text-sm">
                            Many successful crypto founders and developers are neurodivergent. 
                            Their unique perspectives help drive innovation in DeFi, NFTs, and blockchain tech.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <button key={index} className={`group relative bg-surface/95 backdrop-blur-sm rounded-lg p-4 border border-surface/20 hover:border-primary/40 transition-all duration-200 hover:shadow-lg overflow-hidden`}>
                            <div className="text-4xl mb-3 text-primary">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-primary mb-1">{feature.title}</h3>
                            <p className="text-sm text-text-secondary mb-4">{feature.description}</p>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300"></div>
                            
                            <div className="hidden group-hover:block absolute inset-0 bg-surface/95 p-4">
                                <h4 className="text-lg font-semibold text-primary mb-2">More Info</h4>
                                <p className="text-sm text-text-secondary">
                                    {feature.details}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-surface font-semibold hover:shadow-lg transition-all duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NeurodiversityAwareness;