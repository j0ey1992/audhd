import React, { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Analysis', href: '#pattern-scanner' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Calculator', href: '#trading-calculator' },
    { name: 'Reviews', href: '#community-reviews' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      hasScrolled
        ? 'bg-surface/95 backdrop-blur-md shadow-sm py-4'
        : 'bg-surface/95 py-6'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-float">🧠</span>
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              Autistic Investor
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:bg-secondary'
            }`}></span>
            <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'group-hover:bg-secondary'
            }`}></span>
            <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:bg-secondary'
            }`}></span>
          </button>

          {/* Navigation */}
          <div className={`lg:flex items-center gap-8 ${
            isMenuOpen
              ? 'absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-md shadow-sm p-4 border-t border-primary/10'
              : 'hidden lg:flex'
          }`}>
            <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-text-secondary hover:text-primary font-medium transition-colors duration-300 group"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <button className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-surface font-medium overflow-hidden group">
              <span className="relative z-10">Buy on Cronos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;