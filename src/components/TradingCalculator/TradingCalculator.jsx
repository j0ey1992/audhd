import React, { useState } from 'react';

function TradingCalculator() {
    const [entryPrice, setEntryPrice] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [position, setPosition] = useState('');
    const [leverage, setLeverage] = useState('1');
    const [result, setResult] = useState(null);

    const calculateTrade = (e) => {
        e.preventDefault();
        const entry = parseFloat(entryPrice);
        const target = parseFloat(targetPrice);
        const pos = parseFloat(position);
        const lev = parseFloat(leverage);

        if (entry && target && pos) {
            const percentageChange = ((target - entry) / entry) * 100;
            const leveragedReturn = percentageChange * lev;
            const potentialProfit = (pos * leveragedReturn) / 100;

            setResult({
                percentageChange,
                leveragedReturn,
                potentialProfit,
                riskRatio: Math.abs(leveragedReturn / 10), // Assuming 10% as standard risk
                confidenceScore: Math.min(99.99, Math.abs(leveragedReturn) * 2)
            });
        }
    };

    return (
        <section className="relative py-24 bg-[#1a1a1a] overflow-hidden" id="trading-calculator">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,255,127,0.1)_10px,rgba(0,255,127,0.1)_20px)]"></div>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(138,43,226,0.1)_10px,rgba(138,43,226,0.1)_20px)]"></div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                <div className="absolute w-full h-full bg-[linear-gradient(0deg,#1a1a1a_0%,transparent_100%)] top-0"></div>
                <div className="absolute w-full h-full bg-[linear-gradient(180deg,#1a1a1a_0%,transparent_100%)] bottom-0"></div>
            </div>

            <div className="container mx-auto px-4 relative backdrop-blur-sm">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-4 inline-flex items-center gap-4">
                        Hyper-Precise Calculator
                        <span className="animate-bounce">🧮</span>
                    </h2>
                    <p className="text-xl text-white/70">
                        Calculate everything to the 69th decimal place!
                    </p>
                </div>

                {/* Calculator */}
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                    <form onSubmit={calculateTrade} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-lg text-white/70">Entry Price</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={entryPrice}
                                    onChange={(e) => setEntryPrice(e.target.value)}
                                    placeholder="0.00000000"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg text-white/70">Target Price</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    placeholder="0.00000000"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg text-white/70">Position Size</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    placeholder="100"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg text-white/70">Leverage (1-125x)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="125"
                                    value={leverage}
                                    onChange={(e) => setLeverage(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all text-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-degen to-meme text-white px-8 py-4 rounded-xl font-semibold text-lg hover:-translate-y-1 transition-transform duration-300"
                        >
                            Calculate with Autism Precision 🎯
                        </button>
                    </form>

                    {result && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-2">Potential Return</h3>
                                <span className="text-3xl font-bold text-white">
                                    {result.leveragedReturn.toFixed(2)}%
                                </span>
                                <span className="block text-sm text-white/70 mt-1">
                                    With {leverage}x leverage
                                </span>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-2">Profit/Loss</h3>
                                <span className="text-3xl font-bold text-white">
                                    ${Math.abs(result.potentialProfit).toFixed(2)}
                                </span>
                                <span className="block text-sm text-white/70 mt-1">
                                    {result.potentialProfit >= 0 ? 'Profit' : 'Loss'}
                                </span>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-2">Risk Ratio</h3>
                                <span className="text-3xl font-bold text-white">
                                    {result.riskRatio.toFixed(2)}
                                </span>
                                <span className="block text-sm text-white/70 mt-1">
                                    Risk/Reward
                                </span>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-2">Confidence Score</h3>
                                <span className="text-3xl font-bold text-white">
                                    {result.confidenceScore.toFixed(2)}%
                                </span>
                                <span className="block text-sm text-white/70 mt-1">
                                    Based on pure speculation
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className="text-center mt-8 text-sm text-white/50">
                    * Not financial advice. Just autistic pattern recognition at work!
                </div>
            </div>
        </section>
    );
}

export default TradingCalculator;