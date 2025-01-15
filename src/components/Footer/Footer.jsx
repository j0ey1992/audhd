import React from 'react';

function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-background via-surface to-background overflow-hidden">
            {/* Modern Pattern Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--secondary)/0.1)_1px,transparent_1px)] bg-[size:36px_36px]"></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative">
                {/* Main Content */}
                <div className="grid grid-cols-12 gap-8 mb-16">
                    {/* Brand Section - Large */}
                    <div className="col-span-12 lg:col-span-6 xl:col-span-5">
                        <div className="bg-surface rounded-3xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-primary mb-4">Autistic Intelligence</h2>
                                    <p className="text-text-secondary leading-relaxed mb-6">
                                        Where pattern recognition meets market obsession.
                                        Because normal trading is boring.
                                    </p>
                                    <div className="flex gap-6">
                                        <svg className="w-8 h-8 text-degen transform hover:scale-110 transition-transform cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <svg className="w-8 h-8 text-meme transform hover:scale-110 transition-transform cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                        </svg>
                                        <svg className="w-8 h-8 text-primary transform hover:scale-110 transition-transform cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links - Offset */}
                    <div className="col-span-12 lg:col-span-3 lg:-mt-12">
                        <div className="bg-gradient-to-br from-degen/5 to-meme/5 rounded-3xl p-8 border border-primary/5 h-full">
                            <h3 className="text-xl font-bold text-primary mb-6">Quick Links</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Features', href: '#features' },
                                    { name: 'Roadmap', href: '#roadmap' },
                                    { name: 'FAQ', href: '#faq' },
                                    { name: 'Whitepaper', href: '/whitepaper' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href}
                                            className="group flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                                        >
                                            <div className="relative w-8 h-[2px] bg-primary/20 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-degen to-meme transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                            </div>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Social Links - Staggered Grid */}
                    <div className="col-span-12 lg:col-span-3 xl:col-span-4 lg:mt-8">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: '🐦', name: 'Twitter', delay: 'hover:-translate-y-2' },
                                { icon: '💬', name: 'Discord', delay: 'hover:-translate-y-1' },
                                { icon: '📢', name: 'Telegram', delay: 'hover:-translate-y-2' },
                                { icon: '📘', name: 'Whitepaper', delay: 'hover:-translate-y-1' }
                            ].map((social) => (
                                <a 
                                key={social.name}
                                    href={social.name === 'Whitepaper' ? '/whitepaper' : '#'} 
                                    className={`bg-surface rounded-2xl p-4 shadow-lg border border-primary/5 transform ${social.delay} transition-all duration-300 hover:shadow-xl`}
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {social.name === 'Twitter' && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                            )}
                                            {social.name === 'Discord' && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 11a1 1 0 11-2 0 1 1 0 012 0zm-6 0a1 1 0 11-2 0 1 1 0 012 0zm12-7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12l4 4V6a2 2 0 00-2-2z" />
                                            )}
                                            {social.name === 'Telegram' && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            )}
                                            {social.name === 'Whitepaper' && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            )}
                                        </svg>
                                        <span className="text-primary font-medium">{social.name}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-primary/5">
                    {/* Disclaimer */}
                    <div className="bg-gradient-to-r from-degen/5 via-meme/5 to-degen/5 rounded-full px-6 py-3">
                        <p className="text-sm text-text-secondary flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Not financial advice | Just autistic chart enthusiasts
                        </p>
                    </div>

                    {/* Copyright */}
                    <p className="text-text-secondary text-sm flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        &copy; 2025 Autistic Intelligence | Made by Neuro people for neuros
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        </footer>
    );
}

export default Footer;
