import React, { useEffect, useRef } from 'react';

function NeurodiversityAwareness() {
    const observerRef = useRef([]);

    const celebrities = [
        {
            name: 'Elon Musk',
            role: 'Tesla & SpaceX CEO',
            type: "Asperger's/Autism",
            achievement: 'Revolutionized electric vehicles & space industry',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23718096"/></svg>',
        },
        {
            name: 'Satoshi Nakamoto',
            role: 'Bitcoin Creator',
            type: 'Unknown (Speculated Neurodivergent)',
            achievement: 'Created Bitcoin and blockchain technology',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%234A5568"/></svg>',
        },
        {
            name: 'Charles Hoskinson',
            role: 'Cardano Founder',
            type: 'ADHD',
            achievement: 'Pioneered proof-of-stake blockchain',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232D3748"/></svg>',
        },
    ];
    
    useEffect(() => {
        const observers = [];
        const animatedElements = document.querySelectorAll('.scroll-reveal');
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        };
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        animatedElements.forEach((el, index) => {
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            observer.observe(el);
            observers.push(observer);
        });
        
        observerRef.current = observers;
        
        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    const features = [
        {
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" fill="url(#paint0_linear)" />
                    <path d="M24 8v32M8 24h32" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#6366F1" />
                            <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="8" y1="24" x2="40" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fff" />
                            <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Diverse Minds',
            description: 'Each brain type brings unique strengths to Web3',
            details: '~20% of people are neurodivergent, enriching the crypto ecosystem with diverse perspectives'
        },
        {
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4l8 16 16 2-12 12 3 16-15-8-15 8 3-16L0 22l16-2 8-16z" fill="url(#paint0_linear)" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="0" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EC4899" />
                            <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Pattern Masters',
            description: 'Superior pattern recognition in markets',
            details: 'Dyslexic and autistic minds excel at spotting complex market patterns others miss'
        },
        {
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 28h20l-4 16L44 20H24l4-16z" fill="url(#paint0_linear)" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F59E0B" />
                            <stop offset="1" stopColor="#EF4444" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Rapid Innovators',
            description: 'Quick thinking in fast markets',
            details: 'ADHD minds thrive in volatile markets with quick decision-making abilities'
        },
        {
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="20" fill="url(#paint0_linear)" />
                    <circle cx="24" cy="24" r="10" fill="url(#paint1_linear)" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#10B981" />
                            <stop offset="1" stopColor="#3B82F6" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="14" y1="14" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fff" />
                            <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Focus Powers',
            description: 'Intense concentration on analysis',
            details: 'Hyperfocus abilities enable deep technical analysis and project research'
        }
    ];

    return (
        <div className="bg-[#141414] text-white">
            <section className="relative py-24">
                <div className="absolute inset-0">
                    <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
                
                <div className="w-full max-w-7xl mx-auto px-4 relative">
                    <div className="mb-16">
                        <div className="flex flex-col items-center text-center mb-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
                            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                                Neurodiversity in Web3
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mb-12 rounded-full"></div>
                        </div>
                        <div className="relative bg-[#1E1E1E] p-6 border border-white/10">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#2A2A2A] flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3v18" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Understanding Neurodiversity</h3>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-white/70 text-sm scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out delay-100 [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
                                        Just like blockchain has different protocols, human brains work in unique ways.
                                        Neurodiversity refers to the natural variation in how human brains function, process information, and interact with the world.
                                    </p>
                                    <p className="text-white/70 text-sm scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out delay-200 [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
                                        Studies suggest that up to 15-20% of the global population is neurodivergent. In tech and crypto communities,
                                        this percentage can be even higher, with many innovative founders and developers leveraging their unique cognitive styles.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="relative bg-[#1E1E1E] p-6 border border-white/10 scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out delay-300 [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-[#2A2A2A] flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Autism in Crypto</h3>
                                    </div>

                                    <div>
                                        <h4 className="text-white/80 text-sm font-medium mb-2">Superpowers:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Deep focus on blockchain tech</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Exceptional pattern recognition in charts</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Strong analytical abilities</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Attention to technical details</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="pt-3 border-t border-white/10">
                                        <h4 className="text-white/80 text-sm font-medium mb-2">Challenges:</h4>
                                        <p className="text-white/60 text-sm">
                                            May need breaks during high social interaction or sensory-heavy environments.
                                            Clear communication and structured approaches help maximize strengths.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative bg-[#1E1E1E] p-6 border border-white/10 scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out delay-400 [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-[#2A2A2A] flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 2L3 14h10l-2 8 10-12h-10l2-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">ADHD in Web3</h3>
                                    </div>

                                    <div>
                                        <h4 className="text-white/80 text-sm font-medium mb-2">Superpowers:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Intense hyperfocus during trades</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Quick creative problem-solving</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Thrives in dynamic markets</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#2A2A2A]"></div>
                                                <span className="text-white/70 text-sm">Excellent at multitasking</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="pt-3 border-t border-white/10">
                                        <h4 className="text-white/80 text-sm font-medium mb-2">Challenges:</h4>
                                        <p className="text-white/60 text-sm">
                                            May need help with long-term planning and organization.
                                            Tools and reminders can help maintain focus on important tasks.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out [&.reveal]:opacity-100 [&.reveal]:translate-y-0 delay-[400ms] group"
                            >
                                <div className="relative bg-[#1E1E1E] p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                                    <div className="flex flex-col gap-4">
                                        <div className="w-12 h-12 bg-[#2A2A2A] flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                {feature.title === 'Diverse Minds' && (
                                                    <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                                                )}
                                                {feature.title === 'Pattern Masters' && (
                                                    <path d="M12 4l4 8 8 1-6 6 1.5 8L12 23l-7.5 4 1.5-8-6-6 8-1 4-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                                )}
                                                {feature.title === 'Rapid Innovators' && (
                                                    <path d="M13 2L3 14h10l-2 8 10-12h-10l2-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                                )}
                                                {feature.title === 'Focus Powers' && (
                                                    <>
                                                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
                                                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                                                    </>
                                                )}
                                            </svg>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-medium text-white">
                                                {feature.title}
                                            </h3>
                                            <p className="text-white/60 text-sm mt-1">
                                                {feature.description}
                                            </p>
                                        </div>
                                        
                                        <div className="pt-3 border-t border-white/10">
                                            <p className="text-white/60 text-xs">
                                                {feature.details}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2A2A2A] overflow-hidden">
                                        <div className="h-full w-full bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Notable Neurodivergent Leaders
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {celebrities.map((celebrity, index) => (
                                <div
                                    key={index}
                                    className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out [&.reveal]:opacity-100 [&.reveal]:translate-y-0 delay-[400ms] group"
                                >
                                    <div className="relative bg-[#1E1E1E] p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#2A2A2A] flex items-center justify-center">
                                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                                    <rect width="24" height="24" fill="#333" />
                                                    <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-medium text-white truncate">
                                                    {celebrity.name}
                                                </h3>
                                                <p className="text-white/60 text-sm truncate mt-0.5">
                                                    {celebrity.role}
                                                </p>
                                                
                                                <div className="inline-flex items-center px-2 py-0.5 mt-2 bg-[#2A2A2A] border border-white/10">
                                                    <span className="text-white/80 text-xs font-medium">
                                                        {celebrity.type}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-white/60 text-sm mt-3 line-clamp-2">
                                                    {celebrity.achievement}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2A2A2A] overflow-hidden">
                                            <div className="h-full w-full bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 relative bg-[#1E1E1E] p-6 border border-white/10 scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out delay-500 [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
                        <div className="relative">
                            <h3 className="text-2xl font-bold text-white mb-4 text-center">
                                Embracing Neurodiversity in Web3
                            </h3>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto rounded-full mb-6"></div>
                            <p className="text-white/70 text-sm text-center mb-6">
                                Neurodiversity isn't just about challenges - it's about unique abilities and perspectives
                                that drive innovation in blockchain technology and crypto markets.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button className="px-6 py-2 bg-[#2A2A2A] text-white text-sm font-medium hover:bg-[#333] transition-colors duration-300">
                                    Join Our Community
                                </button>
                                <button className="px-6 py-2 bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-300">
                                    Learn About Neurodiversity
                                </button>
                            </div>
                            <p className="text-white/50 text-xs text-center mt-6">
                                Together, we're building a more inclusive and innovative Web3 ecosystem
                                that celebrates cognitive diversity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NeurodiversityAwareness;