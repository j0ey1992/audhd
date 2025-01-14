import React from 'react';

function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-background pt-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">
              Autistic Investor
            </h1>
            
            <p className="text-2xl lg:text-3xl text-text-secondary mt-8 leading-relaxed">
              Where <span className="font-bold text-accent animate-pulse">hyperfocus</span> meets <span className="font-bold text-degen animate-bounce">crypto</span>.<br/>
              Turning <span className="font-bold text-primary underline decoration-wavy">pattern recognition</span> into <span className="font-bold text-meme">profits</span>.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-16">
              <div className="hero-card p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Patterns</h3>
                <p className="text-sm text-text-secondary">
                  Obsessive analysis,<br/>
                  zero distractions
                </p>
              </div>
              <div className="hero-card p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Focus</h3>
                <p className="text-sm text-text-secondary">
                  Pure concentration,<br/>
                  no social noise
                </p>
              </div>
            </div>

            <div className="mt-16 flex justify-center gap-4">
              <button className="hero-button border-primary text-primary hover:bg-primary hover:text-surface">
                View Charts
              </button>
              <button className="hero-button bg-primary text-surface hover:bg-primary/90">
                Join Community
              </button>
            </div>

            <div className="mt-8 text-sm text-text-secondary text-center">
              🧠 Our current hyperfocuses: <span className="text-primary">Focus</span> • <span className="text-accent">Patterns</span> • <span className="text-meme">Creativity</span>
            </div>
          </div>

          {/* Wojak Image */}
          <div className="relative">
            <img 
              src="/wojak_studio.png" 
              alt="Wojak Trader" 
              className="w-full max-w-[500px] mx-auto lg:mx-0 object-contain animate-float"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,transparent_70%)] blur-[20px] animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;