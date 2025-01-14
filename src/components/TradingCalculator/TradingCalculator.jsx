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
        <section className="relative py-24 bg-background overflow-hidden" id="trading-calculator">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4 inline-flex items-center gap-4">
                        Hyper-Precise Calculator
                        <span className="animate-bounce">🧮</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Calculate everything to the 69th decimal place!
                    </p>
                </div>

                {/* Calculator */}
                <div className="max-w-4xl mx-auto bg-surface/95 rounded-3xl p-8 border border-primary/20">
                    <form onSubmit={calculateTrade} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-lg text-text-secondary">Entry Price</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={entryPrice}
                                    onChange={(e) => setEntryPrice(e.target.value)}
                                    placeholder="0.00000000"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-surface focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg text-text-secondary">Target Price</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    placeholder="0.00000000"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-surface focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg text-text-secondary">Position Size</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    placeholder="100"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-surface focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg text-text-secondary">Leverage (1-125x)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="125"
                                    value={leverage}
                                    onChange={(e) => setLeverage(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-surface focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-secondary text-surface px-8 py-4 rounded-xl font-semibold text-lg hover:-translate-y-1 transition-transform duration-300"
                        >
                            Calculate with Autism Precision 🎯
                        </button>
                    </form>

                    {result && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            <div className="bg-surface/95 rounded-2xl p-6 border border-primary/20">
                                <h3 className="text-lg font-bold text-primary mb-2">Potential Return</h3>
                                <span className="text-3xl font-bold text-primary">
                                    {result.leveragedReturn.toFixed(2)}%
                                </span>
                                <span className="block text-sm text-text-secondary mt-1">
                                    With {leverage}x leverage
                                </span>
                            </div>

                            <div className="bg-surface/95 rounded-2xl p-6 border border-primary/20">
                                <h3 className="text-lg font-bold text-primary mb-2">Profit/Loss</h3>
                                <span className="text-3xl font-bold text-primary">
                                    ${Math.abs(result.potentialProfit).toFixed(2)}
                                </span>
                                <span className="block text-sm text-text-secondary mt-1">
                                    {result.potentialProfit >= 0 ? 'Profit' : 'Loss'}
                                </span>
                            </div>

                            <div className="bg-surface/95 rounded-2xl p-6 border border-primary/20">
                                <h3 className="text-lg font-bold text-primary mb-2">Risk Ratio</h3>
                                <span className="text-3xl font-bold text-primary">
                                    {result.riskRatio.toFixed(2)}
                                </span>
                                <span className="block text-sm text-text-secondary mt-1">
                                    Risk/Reward
                                </span>
                            </div>

                            <div className="bg-surface/95 rounded-2xl p-6 border border-primary/20">
                                <h3 className="text-lg font-bold text-primary mb-2">Confidence Score</h3>
                                <span className="text-3xl font-bold text-primary">
                                    {result.confidenceScore.toFixed(2)}%
                                </span>
                                <span className="block text-sm text-text-secondary mt-1">
                                    Based on pure speculation
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className="text-center mt-8 text-sm text-text-secondary">
                    * Not financial advice. Just autistic pattern recognition at work!
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,26,26,0.03)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-[60px] top-1/4 -left-1/4 animate-float"></div>
                <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-[60px] bottom-1/4 -right-1/4 animate-float-reverse"></div>
            </div>
        </section>
    );
}

export default TradingCalculator;