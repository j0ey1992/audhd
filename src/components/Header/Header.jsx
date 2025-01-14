import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    ...(isHomePage ? [
      { name: 'Features', href: '#features' },
      { name: 'Analysis', href: '#pattern-scanner' },
      { name: 'Roadmap', href: '#roadmap' },
      { name: 'Calculator', href: '#trading-calculator' },
      { name: 'Reviews', href: '#community-reviews' }
    ] : []),
    { name: 'Whitepaper', to: '/whitepaper', isPage: true },
    { name: 'AI', to: '/ai', isPage: true }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      hasScrolled
        ? 'bg-surface/80 backdrop-blur-xl shadow-lg py-3'
        : 'bg-surface/60 backdrop-blur-md py-5'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between relative">
          {/* Branding */}
          <div className="flex items-center gap-3 group">
            <span className="text-3xl animate-float transition-transform duration-300 group-hover:scale-110">🧠</span>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Autistic Investor
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute w-6 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2 group-hover:scale-x-110'
              }`}></span>
              <span className={`absolute w-6 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0 translate-x-4' : 'group-hover:scale-x-110'
              }`}></span>
              <span className={`absolute w-6 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2 group-hover:scale-x-110'
              }`}></span>
            </div>
          </button>
          {/* Navigation */}
          <div className={`lg:flex items-center gap-8 transition-all duration-300 ${
            isMenuOpen
              ? 'absolute top-full left-0 right-0 bg-surface/90 backdrop-blur-xl shadow-lg border-t border-primary/10 p-6 opacity-100 translate-y-0'
              : 'hidden lg:flex lg:opacity-100 lg:translate-y-0' + (!isMenuOpen ? ' opacity-0 -translate-y-4' : '')
          }`}>
            <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full lg:w-auto">
                  {link.isPage ? (
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center lg:justify-start gap-2 text-text-secondary hover:text-primary font-medium transition-all duration-300 group relative py-2 lg:py-0 w-full lg:w-auto"
                    >
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      <span className="relative">{link.name}</span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center lg:justify-start gap-2 text-text-secondary hover:text-primary font-medium transition-all duration-300 group relative py-2 lg:py-0 w-full lg:w-auto"
                    >
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      <span className="relative">{link.name}</span>
                    </a>
                  )}
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
