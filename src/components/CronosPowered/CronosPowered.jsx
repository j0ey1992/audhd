import React from 'react';

function CronosPowered() {
    return (
        <section className="relative py-12 bg-[#002D74] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.3),transparent_70%)]"></div>
            </div>
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 p-8 relative overflow-hidden shadow-xl shadow-black/10">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,255,127,0.03)_0px,rgba(0,255,127,0.03)_1px,transparent_1px,transparent_10px)]"></div>
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(138,43,226,0.03)_0px,rgba(138,43,226,0.03)_1px,transparent_1px,transparent_10px)]"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Logo */}
                        <div className="lg:w-48 w-32 relative flex-shrink-0">
                            <div className="absolute inset-0 bg-[#002D74]/30 blur-2xl animate-pulse"></div>
                            <img
                                src="https://cronos.org/logo.svg"
                                alt="Cronos Chain"
                                className="w-full h-auto relative z-10 animate-float"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-bold text-[#002D74]">Powered by Cronos</h2>
                                <span className="text-3xl animate-float">⚡</span>
                            </div>
                            <p className="text-[#002D74]/70 text-sm">Built on Cronos blockchain for high-performance trading!</p>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#002D74]/10 rounded-xl p-3 text-center">
                                    <span className="block text-2xl font-bold text-[#002D74]">1ms</span>
                                    <span className="text-sm text-[#002D74]/70">Speed</span>
                                </div>
                                <div className="bg-[#002D74]/10 rounded-xl p-3 text-center">
                                    <span className="block text-2xl font-bold text-[#002D74]">24/7</span>
                                    <span className="text-sm text-[#002D74]/70">Uptime</span>
                                </div>
                                <div className="bg-[#002D74]/10 rounded-xl p-3 text-center">
                                    <span className="block text-2xl font-bold text-[#002D74]">0.001%</span>
                                    <span className="text-sm text-[#002D74]/70">Fees</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex gap-4 mt-2">
                                <button className="px-6 py-2 rounded-xl bg-[#002D74] text-white font-semibold text-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-[#002D74]/20">
                                    Buy on Cronos 🚀
                                </button>
                                <button className="px-6 py-2 rounded-xl border border-[#002D74]/20 text-[#002D74] font-semibold text-sm hover:bg-[#002D74]/5 hover:border-[#002D74]/40 transition-all duration-300">
                                    Learn More 📚
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CronosPowered;