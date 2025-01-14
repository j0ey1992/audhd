import React from 'react';

function Footer() {
    return (
        <footer className="bg-surface/95 border-t border-primary/20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <span className="text-4xl">🧠</span>
                            Autistic Investor
                        </h2>
                        <p className="text-text-secondary leading-relaxed">
                            Where pattern recognition meets market obsession.
                            Because normal trading is boring.
                        </p>
                        <div className="flex gap-4">
                            <span className="text-4xl animate-bounce">📈</span>
                            <span className="text-4xl animate-bounce delay-100">📉</span>
                            <span className="text-4xl animate-bounce delay-200">🚀</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-primary">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#features" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>Features</span>
                                </a>
                            </li>
                            <li>
                                <a href="#roadmap" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>Roadmap</span>
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>FAQ</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-primary">Stay Connected</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-primary/20 hover:border-primary/40 transition-all">
                                <span className="text-xl">🐦</span>
                                <span>Twitter</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-primary/20 hover:border-primary/40 transition-all">
                                <span className="text-xl">💬</span>
                                <span>Discord</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-primary/20 hover:border-primary/40 transition-all">
                                <span className="text-xl">📢</span>
                                <span>Telegram</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-primary/20 hover:border-primary/40 transition-all">
                                <span className="text-xl">📘</span>
                                <span>Whitepaper</span>
                            </a>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-primary">Important Notice</h3>
                        <p className="text-sm text-text-secondary leading-relaxed bg-surface/50 p-4 rounded-lg border border-primary/20">
                            🚨 This is not financial advice. We're just autistic chart enthusiasts.
                            Please consult a professional before making any financial decisions.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-primary/20 mt-12 pt-8 text-center">
                    <p className="text-text-secondary">
                        &copy; 2024 Autistic Investor. All rights reserved.
                        <span className="block mt-2 text-sm">Made with 🧠 and 🚀 by autists, for autists</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;