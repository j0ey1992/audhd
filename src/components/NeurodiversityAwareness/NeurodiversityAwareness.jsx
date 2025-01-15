import React from 'react';

function NeurodiversityAwareness() {
  // ---------------------------------------
  // 2. DEFINE YOUR CELEBRITIES ARRAY HERE
  // ---------------------------------------
  const celebrities = [
    {
      name: 'Vitalik Buterin',
      role: 'Co-founder of Ethereum',
      type: 'Autism Spectrum (Openly Discussed)',
      achievement:
        'Created Ethereum, revolutionizing blockchain with smart contracts and decentralized applications. Known for his brilliant technical insights and unique problem-solving approach.',
      image: 'https://imageio.forbes.com/specials-images/imageserve/61115ac5b4c5d23845419c4e/0x0.jpg?format=jpg&crop=911,911,x0,y0,safe&height=416&width=416&fit=bounds'
    },
    {
      name: 'Sam Bankman-Fried',
      role: 'Former CEO, FTX',
      type: 'ADHD & Autism Spectrum (Self-Disclosed)',
      achievement:
        'Built FTX into one of the largest crypto exchanges before its controversial collapse. Known for effective altruism and complex trading strategies.',
      image: 'https://start-in-blockchain.fr/wp-content/uploads/2023/11/Affaire-ftx-sbf-prison-coupable-800x500.jpg'
    },
    {
      name: 'Changpeng Zhao (CZ)',
      role: 'CEO of Binance',
      type: 'ADHD (Self-Disclosed)',
      achievement:
        'Built Binance into the world\'s largest cryptocurrency exchange. Known for rapid innovation and adaptable business strategies.',
      image: 'https://imgsrv2.voi.id/4kDJtSzotGDjWLhnZJfM_NyZRLnllBeToUFlbUK-W6s/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8yMTAzNDAvMjAyMjA5MTYxMTQ1LW1haW4uY3JvcHBlZF8xNjYzMzA2MzU2LmpwZw.jpg'
    },
    {
      name: 'Gavin Wood',
      role: 'Founder of Polkadot, Former Ethereum CTO',
      type: 'ADHD (Openly Discussed)',
      achievement:
        'Created Polkadot and authored the Ethereum Yellow Paper. Pioneered cross-chain interoperability and substrate development framework.',
      image: 'https://www.nextbiography.com/wp-content/uploads/2023/12/Gavin-Wood-Pic.jpg'
    },
    {
      name: 'Charles Hoskinson',
      role: 'Founder of Cardano, Co-founder of Ethereum',
      type: 'ADHD (Openly Discussed)',
      achievement:
        'Built Cardano with academic rigor and peer-reviewed research. Pioneered proof-of-stake and formal verification in blockchain.',
      image: 'https://chartwellspeakers.b-cdn.net/wp-content/uploads/2021/10/Charles-Hoskinson-headshot-hi-res-2021-scaled-e1676899481328.jpg'
    },
    {
      name: 'Joseph Lubin',
      role: 'Founder of ConsenSys, Co-founder of Ethereum',
      type: 'Neurodivergent (Openly Discussed)',
      achievement:
        'Built ConsenSys into a major blockchain technology company and helped establish the Ethereum ecosystem through strategic investments and development.',
      image: 'https://insdrcdn.com/media/attachments/c/bb/c84ebfbbc__750x0__q85.png'
    }
  ];

  return (
    <section className="relative min-h-screen bg-background content-spacing pt-12">
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
                Brains are like blockchains. They ALL work differently, and honestly, that's what makes them AWESOME. Neurodiversity? It's when your brain decides it's gonna do its OWN THING, and guess what? THAT'S OKAY. Actually, it's more than okay—it's EPIC for Web3! 🚀
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

          {/* Innovation Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary">The BAYC Revolution!</h3>
              </div>
              <p className="text-text-secondary">
                You think "normal" brains came up with the idea to sell JPEGs of BORED APES for MILLIONS? NOPE! That's peak neurodivergent thinking right there! While everyone else was like "but... why apes?", we were already seeing the future of digital identity and community! Sometimes the craziest ideas are the ones that change the world! �✨
              </p>
            </div>

            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary">DeFi Magic!</h3>
              </div>
              <p className="text-text-secondary">
                Who else would look at traditional finance and go "Cool... but what if we made it COMPLETELY AUTOMATIC and ran it with ROBOT MATH?!" Only us! Our hyperfocus turned into yield farming strategies, and our pattern recognition? That's how we spot those sweet arbitrage opportunities! 🤖💰
              </p>
            </div>

            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary">Meme Magic!</h3>
              </div>
              <p className="text-text-secondary">
                DOGE, PEPE, WOJAK - our community turned MEMES into BILLIONS! Why? Because we understand that value isn't just about "utility" - it's about CULTURE, COMMUNITY, and yes, sometimes just making people LAUGH! When your brain works differently, you see opportunities in the most unexpected places! 🎭🚀
              </p>
            </div>
          </div>


          {/* Stats Section */}
          <div className="grid-responsive mb-16">
            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">20%</h3>
                  <p className="text-text-secondary">
                    of people are neurodivergent (basically a decentralized brain network! 🧠)
                  </p>
                </div>
              </div>
            </div>

            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">2-5x</h3>
                  <p className="text-text-secondary">
                    higher in tech (turns out pattern addiction is a feature! 🎯)
                  </p>
                </div>
              </div>
            </div>

            <div className="component-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">40%</h3>
                  <p className="text-text-secondary">
                    higher innovation rate (chaos + hyperfocus = ALPHA! 🚀)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Understanding Section */}
            <div className="feature-card p-8">
              <h2 className="text-heading-1 font-heading text-primary mb-6">
                Understanding Neurodiversity
              </h2>
              <div className="space-y-6">
                <p className="text-text-secondary leading-relaxed">
                  Think about it - some brains are like Bitcoin (steady, predictable), others are like Ethereum (constantly spawning new ideas), and some are like a memecoin chart (PURE CHAOS ENERGY but somehow still making gains). That's neurodiversity! And in Web3? It's our SUPERPOWER. While normies are trying to make sense of one blockchain, we're over here juggling SEVENTEEN different protocols... and probably inventing three more! 🚀
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="component-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Different Perspectives
                    </h3>
                      <p className="text-text-secondary text-sm">
                        Autism? That's like having a built-in smart contract auditor. We don't just see patterns - we LIVE in them! And yes, we WILL explain every single one! 🔍
                      </p>
                  </div>
                  <div className="component-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Intense Focus
                    </h3>
                      <p className="text-text-secondary text-sm">
                        ADHD? More like having your brain running on multiple chains at once. Sometimes it's chaos, but when it works? PURE MAGIC! ✨
                      </p>
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
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    Autism Spectrum
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-primary font-medium mb-2">What is it?</h4>
                        <p className="text-text-secondary text-sm">
                          Living with autism means experiencing the world in a uniquely intense way. While we have incredible abilities to spot patterns and dive deep into our interests, we also face real challenges. Social situations can be overwhelming - reading facial expressions, understanding unwritten social rules, and managing sensory overload (like bright screens or noisy trading floors) can be exhausting. Changes in routine can cause anxiety, and we might struggle with executive function (planning, organizing, switching tasks). Communication can be tricky - we often take things literally and might miss social cues or sarcasm. But these challenges come with unique strengths: our attention to detail, ability to hyperfocus, and systematic thinking make us exceptional at technical analysis and spotting market patterns others might miss. 🧠✨
                        </p>
                      </div>
                      <div>
                        <h4 className="text-primary font-medium mb-2">Superpowers!</h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            God-tier pattern recognition (perfect for spotting market trends!) 🎯
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Laser focus on interests (I've read EVERY whitepaper since 2015!) 📚
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Elite problem-solving (if it's not logical, we'll MAKE it logical!) 🔧
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADHD Card */}
              <div className="feature-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center wojak-hover">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">ADHD</h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-accent font-medium mb-2">What is it?</h4>
                        <p className="text-text-secondary text-sm">
                          ADHD is like having a brain that's constantly running at full speed but sometimes struggles to stay on track. While we can hyperfocus intensely on interesting tasks, we face daily challenges with attention regulation, not just attention deficit. We might struggle with time management, often losing track of hours while trading or missing important deadlines. Impulsivity can lead to rushed trading decisions without proper research. Organization is a constant battle - from keeping track of multiple positions to managing basic daily tasks. We often struggle with working memory (holding information in mind while using it) and emotional regulation. Task initiation can be paralyzing, even for important activities, while switching between tasks or stopping an engaging activity can be extremely difficult. But these challenges come with unique advantages: our ability to think quickly, make unconventional connections, and maintain intense focus on interesting tasks can lead to innovative trading strategies and spotting opportunities others might miss. ⚡🎯
                        </p>
                      </div>
                      <div>
                        <h4 className="text-accent font-medium mb-2">Superpowers!</h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Hyperfocus mode (12-hour trading sessions? EASY!) ⚡
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            God-tier multitasking (trading while researching new protocols!) 🎮
                          </li>
                          <li className="flex items-center gap-2">
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Elite problem-solving (if it's not logical, we'll MAKE it logical!) 🔧
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADHD Card */}
              <div className="feature-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center wojak-hover">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">ADHD</h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-accent font-medium mb-2">What is it?</h4>
                        <p className="text-text-secondary text-sm">
                          ADHD is like having a brain that's constantly running at full speed but sometimes struggles to stay on track. While we can hyperfocus intensely on interesting tasks, we face daily challenges with attention regulation, not just attention deficit. We might struggle with time management, often losing track of hours while trading or missing important deadlines. Impulsivity can lead to rushed trading decisions without proper research. Organization is a constant battle - from keeping track of multiple positions to managing basic daily tasks. We often struggle with working memory (holding information in mind while using it) and emotional regulation. Task initiation can be paralyzing, even for important activities, while switching between tasks or stopping an engaging activity can be extremely difficult. But these challenges come with unique advantages: our ability to think quickly, make unconventional connections, and maintain intense focus on interesting tasks can lead to innovative trading strategies and spotting opportunities others might miss. ⚡🎯
                        </p>
                      </div>
                      <div>
                        <h4 className="text-accent font-medium mb-2">Superpowers!</h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Hyperfocus mode (12-hour trading sessions? EASY!) ⚡
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            God-tier multitasking (trading while researching new protocols!) 🎮
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Out-of-the-box thinking (connecting dots others don't even see!) 🧩
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dyslexia Card */}
              <div className="feature-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center wojak-hover">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">Dyslexia</h3>
                </div>
                <div className="space-y-4">
                  <div className="component-card p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-accent font-medium mb-2">What is it?</h4>
                        <p className="text-text-secondary text-sm">
                          Dyslexia affects more than just reading - it's a different way of processing information that brings both challenges and strengths. Reading whitepapers, documentation, and trading information can be slow and exhausting, requiring significantly more time and energy than it might for others. We often struggle with working memory (holding information while using it) and processing speed, which can make quick decision-making in volatile markets challenging. Organization and sequencing can be difficult, affecting our ability to follow step-by-step trading strategies or keep track of complex information. Written communication can be particularly challenging, leading to anxiety about writing messages or reports. However, our brains excel at visual thinking and pattern recognition. We often have stronger right-brain functions, leading to excellent problem-solving abilities and creative thinking that can spot unique market opportunities. 🎨🔍
                        </p>
                      </div>
                      <div>
                        <h4 className="text-accent font-medium mb-2">Superpowers!</h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Elite visual pattern recognition (this chart looks EXACTLY like my cat!) 📈
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Big picture thinking (who needs words when you have emojis?) 🔭
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Creative problem-solving (my memes predict market trends!) 🎯
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="w-full mt-16">
            <div className="w-full text-center mb-10">
              <h2 className="text-heading-1 font-heading text-primary mb-4 animate-pulse">
                ACTIVATE SUPERPOWERS! 🦸‍♂️
              </h2>
              <p className="text-text-secondary text-sm md:text-base px-6 sm:px-8 lg:px-16">
                Time to unleash our special abilities! Each power is like a different trading strategy - unique, powerful, and absolutely UNSTOPPABLE! 🚀
              </p>
            </div>

            {/* Animated Superpower Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="feature-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-primary/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center rounded-full group-hover:animate-pulse">
                    <svg className="w-10 h-10 text-primary transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">Pattern Master</h3>
                    <p className="text-text-secondary text-sm">Matrix mode: ACTIVATED! 🔍</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-accent/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center rounded-full group-hover:animate-spin">
                    <svg className="w-10 h-10 text-accent transform group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">Night Owl</h3>
                    <p className="text-text-secondary text-sm">3AM? Prime time! 🌙</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-secondary/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center rounded-full group-hover:animate-bounce">
                    <svg className="w-10 h-10 text-secondary transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">Focus Beast</h3>
                    <p className="text-text-secondary text-sm">Maximum gains mode! ⚡</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-primary/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center rounded-full group-hover:animate-ping">
                    <svg className="w-10 h-10 text-primary transform group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">Chaos Wizard</h3>
                    <p className="text-text-secondary text-sm">Pure alpha energy! 🎯</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notable Leaders */}
          <div className="w-full mt-16 mb-16">
            <div className="w-full text-center mb-10">
              <h2 className="text-heading-1 font-heading text-primary mb-4 animate-pulse">
                LEGENDS OF WEB3! 🏆
              </h2>
              <p className="text-text-secondary text-sm md:text-base px-6 sm:px-8 lg:px-16">
                Meet the GALAXY BRAINS who turned "different" into DOMINANT! These absolute UNITS prove that neurodivergent thinking isn't just an advantage - it's a SUPERPOWER that's reshaping the entire crypto universe! 🌌
              </p>
            </div>

            {/* Here we render the celebrities array */}
            <div className="grid-responsive">
              {celebrities.map((celebrity, index) => (
                <div key={index} className="feature-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg group-hover:ring-2 ring-accent transition-all">
                      <img
                        src={celebrity.image}
                        alt={celebrity.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-primary truncate group-hover:text-accent transition-colors">
                        {celebrity.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {celebrity.role}
                      </p>
                      <div className="inline-flex items-center px-2 py-0.5 mt-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                        <span className="text-primary text-xs font-medium group-hover:text-accent transition-colors">
                          {celebrity.type}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm mt-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {celebrity.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                fill="rgb(var(--text)/0.05)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeurodiversityAwareness;
