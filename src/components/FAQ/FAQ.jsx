import React, { useState } from 'react';

const faqs = [
    {
        question: "What makes Autistic Investor different?",
        answer: "Unlike neurotypical tokens, we harness the power of pure autism to analyze charts with unprecedented focus. Our community members can stare at charts for 16 hours straight without blinking!",
        emoji: "🧠"
    },
    {
        question: "How do you find so many patterns?",
        answer: "Through the power of hyperfixation and pattern recognition! We see triangles, wedges, and fractals everywhere - even in places they don't exist. That's our superpower!",
        emoji: "📊"
    },
    {
        question: "Is social interaction required?",
        answer: "Absolutely not! We prefer to communicate through chart analysis and technical indicators. Social skills are inversely proportional to trading success!",
        emoji: "🤖"
    },
    {
        question: "What's your trading strategy?",
        answer: "We apply maximum autism to technical analysis, running 42 indicators simultaneously while memorizing every candle pattern since the dawn of crypto. Sleep is optional.",
        emoji: "📈"
    },
    {
        question: "How many indicators do you use?",
        answer: "Yes. All of them. Simultaneously. Including some we invented ourselves during 3 AM hyperfocus sessions. More indicators = more accuracy!",
        emoji: "🔬"
    },
    {
        question: "What's your community like?",
        answer: "Picture a bunch of autistic traders sharing their special interests in crypto, comparing pattern recognition abilities, and infodumping about obscure technical indicators. It's beautiful!",
        emoji: "👥"
    }
];

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="relative py-24 bg-background overflow-hidden" id="faq">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Frequently Asked Questions
                        <span className="animate-bounce">❓</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Everything you need to know about our autistic approach to trading!
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-surface/95 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer ${
                                activeIndex === index ? 'shadow-lg' : 'hover:-translate-y-1'
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
                    <div className="bg-surface/95 rounded-2xl p-6 border border-accent/20 flex items-center gap-4">
                        <span className="text-2xl animate-shake">⚠️</span>
                        <p className="text-lg text-text-secondary italic">
                            Warning: Side effects may include excessive pattern recognition,
                            chart obsession, and the inability to stop talking about technical analysis!
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] animate-particle-float"></div>
            </div>
        </section>
    );
}

export default FAQ;