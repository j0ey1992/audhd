import React from 'react';

function CronosPowered() {
    return (
        <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-bold text-primary flex items-center gap-4">
                                <span className="text-6xl animate-float">⚡</span>
                                Powered by Cronos
                            </h2>
                            <p className="text-xl text-text-secondary leading-relaxed">
                                Built on Cronos blockchain for high-performance trading and pattern recognition!
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-surface/95 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 shadow-lg group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors">
                                        <span className="text-4xl animate-float">⚡</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary">Lightning Fast</h3>
                                        <p className="text-lg text-text-secondary">10,000 patterns/sec</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-surface/95 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 shadow-lg group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors">
                                        <span className="text-4xl animate-float">💰</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary">Low Fees</h3>
                                        <p className="text-lg text-text-secondary">More for charting</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center bg-surface/95 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                                <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    1ms
                                </span>
                                <span className="text-lg text-text-secondary">Speed</span>
                            </div>
                            <div className="text-center bg-surface/95 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                                <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    24/7
                                </span>
                                <span className="text-lg text-text-secondary">Uptime</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-surface font-semibold text-lg overflow-hidden group">
                                <span className="relative z-10">Buy on Cronos 🚀</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            <button className="relative px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold text-lg overflow-hidden group">
                                <span className="relative z-10">Learn More 📚</span>
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="flex-1 relative">
                        <div className="w-[400px] h-[400px] flex items-center justify-center relative">
                            <img
                                src="https://cronos.org/logo.svg"
                                alt="Cronos Chain"
                                className="w-[300px] h-[300px] object-contain relative z-10 animate-float"
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,transparent_70%)] blur-[40px] animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-[60px] top-1/4 -left-1/4 animate-float"></div>
                <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-[60px] bottom-1/4 -right-1/4 animate-float-reverse"></div>
            </div>
        </section>
    );
}
export default CronosPowered;