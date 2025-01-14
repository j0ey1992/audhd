import React, { useState } from 'react';

const faqs = [
    {
        question: "What makes your AI different?",
        answer: "ACTUALLY *adjusts glasses nervously* our AI (Autistic Intelligence) is powered by pure, unfiltered autism! We just hook up an autistic person to a Red Bull IV drip and let them stare at charts for 16 hours straight. The pattern recognition is INCREDIBLE!",
        emoji: "🧠"
    },
    {
        question: "How does your AI analyze tokens?",
        answer: "*excited hand flapping* We have a room of highly focused autistic people who LOVE arranging data by color, pattern, and arbitrary categories they made up at 3 AM! Just don't ask why all the charts are organized by which Pokémon they look like.",
        emoji: "🤖"
    },
    {
        question: "Is your pattern detection accurate?",
        answer: "*intense eye contact* Our analysts have memorized EXACTLY 7,429 chart patterns, including that one that looks like a cat wearing a hat! We see triangles EVERYWHERE. Sometimes they're even real! Did you know the ascending triangle was discovered by an autistic person staring at charts until their eyes dried out?",
        emoji: "📊"
    },
    {
        question: "Can your AI spot scams?",
        answer: "Remember that time we spent 72 hours straight categorizing every rugpull by their geometric patterns? Our analysts have memorized EVERY suspicious contract ever deployed. They even color-coded them by trustworthiness (we use EXACTLY 16 shades of red flags)!",
        emoji: "🔍"
    },
    {
        question: "How fast is your analysis?",
        answer: "*starts rapidly listing features* Depends on how many energy drinks the analyst has had! Our current record holder processed 42 technical indicators simultaneously after discovering coffee (42 is the perfect number, don't argue). We had to remind them to blink!",
        emoji: "✨"
    },
    {
        question: "What about information overload?",
        answer: "*speaking extremely fast* Information overload? You mean NORMAL LOAD? Our analysts THRIVE on overwhelming amounts of data! Though we did have to stop one from creating a 47-page report on a single 5-minute candle... it was a VERY interesting candle though!",
        emoji: "🎨"
    },
    {
        question: "How do you handle multiple tokens?",
        answer: "*intense enthusiasm* That's when our analysts are in their ELEMENT! While neurotypicals get overwhelmed, our team is happily analyzing 50 charts simultaneously while reciting their favorite blockchain whitepapers backwards! We had to install wider monitors to fit all their patterns.",
        emoji: "🦋"
    },
    {
        question: "What's your analysis process like?",
        answer: "*infodumping intensifies* First, we ensure optimal analysis conditions: exactly 3 monitors (arranged symmetrically), precise room temperature of 21.3°C, and NO LOUD NOISES (except for excited squealing when we spot a perfect Wyckoff pattern). Then we... wait, where was I? Oh yes, PATTERNS!",
        emoji: "⚡"
    },
    {
        question: "What happens when analysis fails?",
        answer: "*adjusts collar uncomfortably* Well... sometimes our ADHD analysts get distracted by a shiny new token mid-analysis. Or they start a 6-hour research session on the history of candlestick patterns instead of finishing the current chart. But that's what the backup analysts are for!",
        emoji: "🎯"
    },
    {
        question: "Any notable analysis disasters?",
        answer: "*nervous laughter* There was that ONE time we let a neurotypical intern organize our pattern database... They sorted it alphabetically instead of by geometric similarity and RGB color values! It took us THREE DAYS to restore order. We still have nightmares about it.",
        emoji: "💥"
    },
    {
        question: "What about missed predictions?",
        answer: "*defensive hand gestures* Listen, sometimes our analysts get TOO excited about patterns and see them everywhere. Like that time someone was CONVINCED the chart formed a perfect Pikachu face and went all in... turns out it was just a regular double top. We don't talk about that day.",
        emoji: "😅"
    },
    {
        question: "How do you handle trading errors?",
        answer: "*speaking rapidly* Usually it's because someone's ADHD kicked in and they accidentally bought when they meant to sell (or bought 50 times instead of once because the button was fun to click). Or that time an analyst got so excited about a perfect fractal they forgot to actually place the trade!",
        emoji: "🫣"
    },
    {
        question: "What's your biggest challenge?",
        answer: "*sighs deeply* Honestly? When neurotypicals try to 'help' by organizing things 'normally' or suggesting we 'take breaks'. Or when our ADHD makes us start 47 different analyses without finishing any... But hey, at least we have really cool spreadsheets color-coded by market cap!",
        emoji: "😮‍💨"
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
                            chart obsession, and the inability to stop talking about technical analysis!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
