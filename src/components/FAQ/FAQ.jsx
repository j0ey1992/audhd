import React, { useState } from 'react';

const faqs = [
    {
        question: "How do different brains = better trading?",
        answer: "*excitedly sharing insights* Oh my gosh, let me tell you! My ADHD helps me monitor multiple charts at once, my autism spots patterns others miss, and my dyslexia means I've created this AMAZING visual trading system! It's like having different superpowers that work together! Want to see my 50-slide presentation about it? I color-coded EVERYTHING! 🎨",
        emoji: "🧠"
    },
    {
        question: "What's it like trading with ADHD?",
        answer: "*bouncing with energy* It's like having 17 browser tabs open in your brain - but in a GOOD way! I can track multiple markets simultaneously, and when hyperfocus kicks in? MAGIC HAPPENS! Though sometimes I forget where I put my coffee... but hey, I spotted that trend reversal while looking for it! 😅",
        emoji: "⚡"
    },
    {
        question: "How does autism help with analysis?",
        answer: "*intense focus activated* The patterns... they're EVERYWHERE! I can spend hours analyzing the tiniest details of a chart, and I LOVE IT! Did you know I've categorized every single candlestick pattern by shape, size, AND potential energy? I have a special spreadsheet just for triangles! Want to see it?",
        emoji: "🔍"
    },
    {
        question: "Trading with dyslexia - how's that work?",
        answer: "*enthusiastically explaining* Traditional charts too confusing? NO PROBLEM! I created this AMAZING system using colors and shapes instead of numbers! Each pattern has its own color palette, and guess what? It works BETTER than traditional analysis! Want to see my rainbow trading strategy?",
        emoji: "🎨"
    },
    {
        question: "What's your secret trading weapon?",
        answer: "*excited hand flapping* Our different ways of thinking! Like, my ADHD notices EVERYTHING happening at once, my autistic pattern recognition is INCREDIBLE, and my dyslexic visual thinking helps me see the big picture in a unique way! It's like having a trading SUPERPOWER COMBO!",
        emoji: "💫"
    },
    {
        question: "How do you handle market chaos?",
        answer: "*laughs in pattern recognition* Chaos? You mean OPPORTUNITY! While others see random price moves, we're connecting dots they didn't even know existed! Though sometimes we get SO excited about our theories that we forget to eat... but look at this BEAUTIFUL correlation we found!",
        emoji: "🌪️"
    },
    {
        question: "What's your analysis setup like?",
        answer: "*enthusiastically sharing special interest* First, everything MUST be perfectly arranged - monitors at EXACTLY 27.3 degrees, 16 different colored highlighters (each with its specific purpose!), and my lucky stim toy for intense analysis sessions! Want to see my 23-page setup guide?",
        emoji: "🖥️"
    },
    {
        question: "How do you stay focused on trading?",
        answer: "*excited rambling* That's the neat part - we don't! Sometimes I start analyzing a chart and end up creating a complete theory about how moon phases affect token prices! But you know what? Those random connections often lead to our best discoveries!",
        emoji: "🎯"
    },
    {
        question: "What about sensory overload?",
        answer: "*sharing coping strategies* Oh, we've got this AMAZING system! Noise-canceling headphones, special monitor filters, and this COOL fidget toy that helps during intense market analysis! Plus, our special interest in crypto makes it easier to filter the important stuff!",
        emoji: "🎧"
    },
    {
        question: "How do you handle trading mistakes?",
        answer: "*enthusiastically explaining systems* We've created this INCREDIBLE checklist system with exactly 42 steps (because that's the perfect number)! Each step has its own color code and verification process. Sometimes we get distracted by making the checklist prettier... but hey, it works!",
        emoji: "✅"
    },
    {
        question: "What's your biggest trading strength?",
        answer: "*passionate infodump incoming* Our ability to hyperfocus on details while seeing unique patterns! Like yesterday, I spent 14 hours analyzing this ONE pattern and found something AMAZING! Want to see my 147-slide presentation about it? I added animations!",
        emoji: "💪"
    },
    {
        question: "How do you explain your trades to others?",
        answer: "*excited hand gestures* Well, sometimes people don't understand why we grouped trades by color psychology AND lunar phases... but that's okay! We've created this AWESOME visualization system that makes perfect sense (to us, at least!). Want to see our 3D chart model?",
        emoji: "📈"
    },
    {
        question: "Any unique trading strategies?",
        answer: "*happy stimming* OH BOY, do we! We've combined traditional analysis with our special interests to create something TOTALLY unique! Like our Pokemon-inspired pattern system (that double-bottom really DOES look like a sleeping Snorlax!). It works surprisingly well!",
        emoji: "🎮"
    }
];

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="relative py-24 bg-gradient-to-b from-background via-surface to-background overflow-hidden" id="faq">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Diagonal stripes pattern */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,255,127,0.03)_0px,rgba(0,255,127,0.03)_2px,transparent_2px,transparent_12px)] opacity-70"></div>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(138,43,226,0.03)_0px,rgba(138,43,226,0.03)_2px,transparent_2px,transparent_12px)] opacity-70"></div>
                
                {/* Dots overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,127,0.2)_1px,transparent_1px)] bg-[size:20px_20px] [background-position:0_0]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(138,43,226,0.2)_1px,transparent_1px)] bg-[size:20px_20px] [background-position:10px_10px]"></div>

                {/* Radial fade */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,white_70%)]"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Questions We Get A Lot! 
                        <span className="animate-bounce">🤔</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Everything you wanted to know about our neurodivergent trading superpowers!
                        <br/>
                        <span className="text-lg">(And yes, we might get a bit excited explaining things! 🎯)</span>
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white/80 backdrop-blur-sm rounded-3xl border border-primary/10 hover:border-primary/20 transition-all duration-300 cursor-pointer ${
                                activeIndex === index ? 'shadow-lg shadow-primary/5' : 'hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5'
                            }`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="p-6 flex items-center gap-4">
                                <span className="text-2xl animate-float">{faq.emoji}</span>
                                <h3 className="text-xl font-medium text-primary flex-1">
                                    {faq.question}
                                </h3>
                                <span className={`text-2xl text-primary transition-transform duration-300 ${
                                    activeIndex === index ? 'rotate-180' : ''
                                }`}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>
                            
                            <div className={`overflow-hidden transition-all duration-300 ${
                                activeIndex === index ? 'max-h-96' : 'max-h-0'
                            }`}>
                                <div className="p-6 pt-0">
                                    <p className="text-lg text-text-secondary leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="max-w-3xl mx-auto mt-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-meme/20 flex items-center gap-4 shadow-lg shadow-primary/5">
                    <span className="text-2xl animate-shake">⚠️</span>
                    <p className="text-lg text-text-secondary italic">
                        Warning: Side effects may include excessive pattern recognition, 
                        ADHD-powered multi-chart analysis, dyslexic visual trading strategies, 
                        autistic deep-dives into token mechanics, and the unstoppable urge to 
                        explain why THIS pattern is DEFINITELY different from the last 17 we found! 
                        (But that's what makes us awesome! 🚀)
                    </p>
                </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
