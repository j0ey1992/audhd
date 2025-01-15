import React, { useEffect, useRef } from 'react';

function NeurodiversityAwareness() {
  const observerRef = useRef([]);

  // Example data sets
  const celebrities = [
    {
      name: "Sam Bankman-Fried",
      role: "FTX Founder (and chaotically neurodivergent!)",
      type: "ADHD & Pattern Recognition",
      achievement: "Oh boy, where do we start? 😅 This guy took ADHD multitasking to a WHOLE new level - running an exchange, playing League of Legends, AND 'accidentally' using customer funds! His pattern recognition was so good he found patterns in OTHER PEOPLE'S MONEY! Now he's got plenty of time to hyperfocus on his legal defense... in an orange jumpsuit! 🏢",
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%234A5568"/></svg>',
    },
    {
      name: "Vitalik Buterin",
      role: "Ethereum Creator (and proudly autistic!)",
      type: "Autism",
      achievement: "Now THIS is how you use neurodivergent superpowers for good! When everyone was focused on Bitcoin, his autistic brain was like 'Wait... what if we made the WHOLE BLOCKCHAIN programmable?' His ability to deep-dive into complex problems and spot unique patterns literally created a new era of crypto! Want to see my 42-slide presentation about his coding patterns? 🚀",
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23718096"/></svg>',
    },
    {
      name: "Charles Hoskinson",
      role: "Cardano Founder (openly neurodivergent)",
      type: "ADHD & Pattern Recognition",
      achievement: "This guy's brain works at hyperspeed! When everyone else was like 'crypto is just for payments', he was already thinking about academic validation, proof systems, AND governance! His ability to juggle multiple complex ideas at once is EXACTLY how my brain works! (Though I also forget where I put my coffee... 😅)",
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23718096"/></svg>',
    },
    {
      name: "CZ (Changpeng Zhao)",
      role: "Binance Founder (hyperfocus master!)",
      type: "Pattern Recognition & Focus",
      achievement: "Talk about hyperfocus! Built the world's largest crypto exchange by spotting patterns in trading behavior! Though maybe he hyperfocused TOO much on growth and forgot about those pesky regulations... Oops! 😅 Now he's got plenty of time to read ALL the compliance documents! (Wonder if he'll color-code them like we would?)",
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232D3748"/></svg>',
    },
    {
      name: "Justin Sun",
      role: "TRON Founder (energy overload!)",
      type: "ADHD & Marketing Focus",
      achievement: "This guy's ADHD energy is OFF THE CHARTS! Announcing announcements of future announcements! 🎯 When everyone else was doing normal marketing, he was like 'What if we had lunch with Warren Buffett AND made it trend on Twitter?' His ability to create hype is legendary... though maybe a bit TOO legendary sometimes! 😅",
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232D3748"/></svg>',
    },
    {
      name: "Do Kwon",
      role: "Terra/LUNA Creator (pattern overconfidence!)",
      type: "Pattern Recognition Gone Wild",
      achievement: "Oh dear... remember when he was SO convinced his algorithmic patterns would work that he bet $11M on it? That's what happens when you combine hyperfocus with a dash of 'I'm totally right!' energy! Now he's got plenty of time to analyze prison escape patterns... I mean, TOTALLY DIFFERENT patterns! 🏃‍♂️",
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232D3748"/></svg>',
    },
  ];

  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M24 8v32M8 24h32"
            stroke="url(#paint1_linear)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="4"
              y1="4"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="8"
              y1="24"
              x2="40"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Different Thinking POWER!',
      description: 'Our brains work in AMAZING ways!',
      details:
        'You know that feeling when your brain makes connections that others miss? That\'s our superpower! Sometimes I get SO excited explaining my latest crypto theory that I forget normal people don\'t spend 8 hours analyzing token economics... but that\'s what makes us AWESOME!',
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M24 4l8 16 16 2-12 12 3 16-15-8-15 8 3-16L0 22l16-2 8-16z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0"
              y1="4"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EC4899" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Hyperfocus MODE!',
      description: 'When we\'re into something, we\'re REALLY into it!',
      details:
        "Last week I got SO excited about a new trading strategy that I created this INCREDIBLE spreadsheet at 3 AM! Sure, I forgot to eat dinner... but I discovered something AMAZING! Want to see my color-coded analysis? I used EXACTLY 16 different highlighting colors!",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M13 2L3 14h10l-2 8 10-12h-10l2-8z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="4"
              y1="4"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EF4444" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Creative Solutions!',
      description: 'We solve problems differently!',
      details:
        "While everyone else was following the crowd, I was like 'Wait! What if we look at this COMPLETELY differently?' Sometimes my ideas seem weird at first, but that's how we spot opportunities others miss! (Though maybe not EVERY random idea at 2 AM is genius... 😅)",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="20" fill="url(#paint0_linear)" />
          <circle cx="24" cy="24" r="10" fill="url(#paint1_linear)" />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="4"
              y1="4"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="14"
              y1="14"
              x2="34"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Detail MASTERY!',
      description: 'We notice EVERYTHING!',
      details:
        "You know how some people skim whitepapers? Well, I've read EACH ONE exactly 7 times! Did you know there's this tiny detail in the Bitcoin whitepaper that NOBODY talks about? Let me tell you about it! (Warning: This explanation might take a while... I'm VERY excited about this!)",
    },
  ];

  // Intersection Observer setup remains unchanged
  useEffect(() => {
    const observers = [];
    const animatedElements = document.querySelectorAll('.scroll-reveal');

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    animatedElements.forEach((el) => {
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      observer.observe(el);
      observers.push(observer);
    });

    observerRef.current = observers;

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-background content-spacing">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-highlight"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Hero Section */}
          <div className="hero-card bg-surface/95 backdrop-blur-md p-8 md:p-12 mb-16">
            <div className="relative">
                <h1 className="text-heading font-heading text-primary mb-4">
                  Neurodiversity in Web3
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary max-w-3xl">
                  Hey fellow neurodivergent traders! 🚀 Let me tell you how our different ways of thinking are REVOLUTIONIZING crypto! From my ADHD-powered multi-chart analysis to my autistic pattern-spotting superpowers (and yes, I'll tell you about ALL the patterns I've found!), our unique perspectives are changing EVERYTHING! Want to hear about my latest 3 AM trading epiphany? 😄
                </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="hero-button bg-primary text-surface">
                  Explore Strengths
                </button>
                <button className="hero-button bg-surface text-primary">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid-responsive mb-16">
            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">20%</h3>
                  <p className="text-text-secondary">of people are neurodivergent (that's SO many unique perspectives!)</p>
                </div>
              </div>
            </div>
            
            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">2-5x</h3>
                  <p className="text-text-secondary">higher in tech (our brains LOVE this stuff!)</p>
                </div>
              </div>
            </div>
            
            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">40%</h3>
                  <p className="text-text-secondary">higher innovation rate (different perspectives = better ideas!)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Understanding Section */}
            <div className="feature-card p-8">
              <h2 className="text-heading-1 font-heading text-primary mb-6">Understanding Neurodiversity</h2>
              <div className="space-y-6">
                <p className="text-text-secondary leading-relaxed">
                  You know how everyone's always saying "think outside the box"? Well, we're like "WHAT box?" Our brains just work differently! Sometimes that means getting SUPER excited about a new trading strategy at 3 AM, or creating the MOST detailed spreadsheet you've ever seen, or coming up with solutions that make people go "wait, HOW did you think of that?" It's not better or worse - it's just DIFFERENT! And in crypto? Different is our SUPERPOWER!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="component-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">Different Perspectives</h3>
                    <p className="text-text-secondary text-sm">Our unique way of thinking helps us spot opportunities others might miss! (And sometimes leads to the MOST interesting conversations! 😄)</p>
                  </div>
                  <div className="component-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">Intense Focus</h3>
                    <p className="text-text-secondary text-sm">When we're passionate about something, our dedication is UNMATCHED! (Though we might need reminders for snack breaks! 😅)</p>
                  </div>
                </div>
              </div>
            </div>

              {/* Types Section */}
            <div className="space-y-6">
              {/* Autism Card */}
              <div className="feature-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center wojak-hover">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">Autism Spectrum</h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <h4 className="text-primary font-medium mb-2">My Superpowers!</h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        I can spot patterns NOBODY else sees!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Deep-diving into crypto for 12 hours? Easy!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        I remember EVERY trading pattern I've seen!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ADHD Card */}
              <div className="feature-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center wojak-hover">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">ADHD</h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <h4 className="text-accent font-medium mb-2">My Crypto Powers!</h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Watching 7 charts at once? No problem!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Random 3 AM trading insights
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Multitasking like a pro! (Usually...)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dyslexia Card */}
              <div className="feature-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center wojak-hover">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">Dyslexia</h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <h4 className="text-green-500 font-medium mb-2">My Trading Edge!</h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Visual trading strategies FTW!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Created my own chart color system
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Big picture thinking = Better trades!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="w-full mt-16">
            <div className="w-full text-center mb-10">
              <h2 className="text-heading-1 font-heading text-primary mb-4">Our Neurodivergent Superpowers!</h2>
              <p className="text-text-secondary text-sm md:text-base px-6 sm:px-8 lg:px-16">
                Let me tell you about our AMAZING abilities in Web3! 
                (I've organized them into exactly 4 categories because that's the perfect number - and yes, I spent 6 hours color-coding and reorganizing until it was JUST right! My ADHD hyperfocus and autistic need for perfect organization teamed up on this one! 😅)
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                return (
                  <div key={index} className="feature-card p-6">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
                      <p className="text-text-secondary text-sm">{feature.description}</p>
                      <div className="pt-3 border-t border-primary/10">
                        <p className="text-text-secondary text-xs leading-relaxed">{feature.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notable Leaders */}
          <div className="w-full mt-16 mb-16">
            <div className="w-full text-center mb-10">
              <h2 className="text-heading-1 font-heading text-primary mb-4">
                The Web3 Neurodivergent Gallery! 🎨
              </h2>
              <p className="text-text-secondary text-sm md:text-base px-6 sm:px-8 lg:px-16">
                From groundbreaking innovations to... uh... "creative" interpretations of financial regulations! 
                Here's our collection of Web3's most notable neurodivergent minds (some for better, some for prison... I mean, worse! 😅)
              </p>
            </div>

            <div className="grid-responsive">
              {celebrities.map((celebrity, index) => (
                <div key={index} className="feature-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg">
                      <img
                        src={celebrity.image}
                        alt={celebrity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-primary truncate">
                        {celebrity.name}
                      </h3>
                      <p className="text-text-secondary text-sm">{celebrity.role}</p>
                      <div className="inline-flex items-center px-2 py-0.5 mt-3 bg-primary/10 rounded-md">
                        <span className="text-primary text-xs font-medium">
                          {celebrity.type}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm mt-3 line-clamp-2">
                        {celebrity.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="feature-card p-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-500 ease-out [&.reveal]:opacity-100 [&.reveal]:translate-y-0">
            <div className="w-full text-center">
              <h3 className="text-heading-2 font-heading text-primary mb-4">
                Join Our AMAZING Community!
              </h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                Listen, in crypto, our different ways of thinking aren't just 'quirks' - they're our SUPERPOWERS! 
                That ADHD moment when you notice a trend because you were looking at 7 different charts at once? GENIUS! 
                That autistic deep-dive that helps you understand EVERY detail of a protocol? INCREDIBLE! 
                The way we can hyperfocus on research until we understand EVERYTHING? AMAZING! 
                Even those times when we get super excited and info-dump about crypto to anyone who'll listen... 
                that enthusiasm helps us spot opportunities others miss! 
                (Want to hear my latest theory? I've got presentations, spreadsheets, AND mind maps! 😄)
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="hero-button bg-primary text-surface">
                  Connect &amp; Learn
                </button>
                <button className="hero-button bg-surface text-primary">
                  Discover Strengths
                </button>
                <button className="hero-button bg-accent text-surface">
                  Take the Test!
                </button>
              </div>
              <p className="text-text-secondary text-xs mt-6">
                Did you know we've found EXACTLY 42 ways our different thinking styles create trading advantages? 
                I've organized them into a color-coded system! Want to see my presentation? No? Maybe later then... 
                (But it has REALLY cool animations! 😊)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Shape Divider */}
        <div className="w-full relative">
          <div className="absolute inset-x-0 bottom-0 w-full overflow-hidden leading-none rotate-180">
            <svg
              className="w-full h-[40px]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                fill="rgba(255,255,255,0.05)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeurodiversityAwareness;
