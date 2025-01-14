import React from 'react';

const reviews = [
    {
        name: "Pattern Master Mike",
        role: "Chart Obsessed Trader",
        review: "Finally, a community that understands my need to analyze the 1-second chart for 16 hours straight! The pattern recognition here is off the charts! 🚀",
        avatar: "🧠",
        rating: 5,
        specialInterest: "Fibonacci Sequences"
    },
    {
        name: "Technical Tom",
        role: "Indicator Enthusiast",
        review: "I've never seen a community so dedicated to running every technical indicator simultaneously. My 42 moving averages have found their home! 📊",
        avatar: "🤓",
        rating: 5,
        specialInterest: "Moving Averages"
    },
    {
        name: "Data Sarah",
        role: "Pattern Recognition Specialist",
        review: "The only place where memorizing every candle since 2009 is considered normal. These are my kind of people! 💹",
        avatar: "👩‍💻",
        rating: 5,
        specialInterest: "Historical Data Analysis"
    }
];

const traits = [
    {
        trait: "Pattern Recognition",
        level: "Maximum",
        emoji: "📊"
    },
    {
        trait: "Social Awareness",
        level: "Minimal",
        emoji: "🤖"
    },
    {
        trait: "Chart Obsession",
        level: "Extreme",
        emoji: "📈"
    }
];

function CommunityReviews() {
    return (
        <section className="relative py-24 bg-surface overflow-hidden" id="community-reviews">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Community Wall
                        <span className="animate-bounce">📌</span>
                    </h2>
                    <p className="text-xl text-text-secondary">See what our community is buzzing about!</p>
                </div>

                {/* Social Feed Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
                    {/* Reviews Feed */}
                    <div className="space-y-8">
                        {reviews.map((review, index) => (
                            <div
                                key={review.name}
                                className="bg-background/95 rounded-2xl p-6 border border-primary/10 hover:border-primary/20 transition-all duration-300 group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Profile Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-3xl">
                                            {review.avatar}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-primary">{review.name}</h3>
                                        <span className="text-sm text-text-secondary">{review.role}</span>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#5865F2]"></div>
                                    <div className="pl-6">
                                        <p className="text-lg text-text-secondary leading-relaxed mb-4 bg-surface p-4 rounded-lg border border-primary/10">
                                            {review.review}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                                            <span>Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                            <span>·</span>
                                            <span>Edited</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Interactions */}
                                <div className="flex items-center justify-between pl-6">
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 text-sm text-[#B9BBBE] hover:text-[#FFFFFF] transition-colors">
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                                <path d="M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5c1.104 0 2 .896 2 2 0-.738.404-1.376 1-1.723V3.5c0-1.105.896-2 2-2s2 .895 2 2v.277c.596.347 1 .985 1 1.723 0-1.104.896-2 2-2 2.934 0 5.773 2.6 6.808 7.579z"/>
                                            </svg>
                                            <span>32</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-[#B9BBBE] hover:text-[#FFFFFF] transition-colors">
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                                <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"/>
                                            </svg>
                                            <span>5</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm bg-[#5865F2] px-2 py-1 rounded">
                                        <span className="text-white">{review.specialInterest}</span>
                                        <svg width="16" height="16" viewBox="0 0 16 15.2" className="fill-white">
                                            <path d="M7.4 11.17L4 8.62l1-1.36 2 1.53L10.64 4 12 5z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Community Traits with Image */}
                    <div className="bg-background/95 rounded-2xl p-6 border border-primary/10 relative overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                src="/wojak_studio.png"
                                alt="Wojak Studio"
                                className="absolute right-0 bottom-0 w-1/2 opacity-20"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-6">Community DNA</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {traits.map((trait) => (
                                <div
                                    key={trait.trait}
                                    className="bg-surface p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-xl">
                                                {trait.emoji}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-primary">{trait.trait}</h4>
                                            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-primary to-secondary animate-fill-level"></div>
                                            </div>
                                            <span className="text-sm text-text-secondary">{trait.level}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Discord Server Widget */}
                        <div className="mt-8 bg-[#36393F] p-6 rounded-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-[#5865F2] flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 24 24" className="fill-white">
                                        <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Autistic Investors</h3>
                                    <div className="flex items-center gap-2 text-sm text-[#B9BBBE]">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>1,234 online</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-[#B9BBBE] mb-6">
                                Join our vibrant community of pattern recognition enthusiasts!
                            </p>
                            <button className="w-full bg-[#5865F2] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[#4752C4] transition-colors flex items-center justify-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                                </svg>
                                Join Server
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,26,26,0.03)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 animate-move-grid"></div>
                <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] top-1/4 -left-1/4 animate-float"></div>
                <div className="absolute w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[100px] bottom-1/4 -right-1/4 animate-float-reverse"></div>
            </div>
        </section>
    );
}

export default CommunityReviews;