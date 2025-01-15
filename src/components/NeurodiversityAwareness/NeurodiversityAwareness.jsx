import React from 'react';

function NeurodiversityAwareness() {
  // ---------------------------------------
  // 1. DEFINE YOUR FEATURES ARRAY HERE
  // ---------------------------------------
  const features = [
    {
      icon: (
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
      ),
      title: 'Pattern Recognition',
      description: 'Spot hidden market opportunities others might miss!',
      details:
        'Our brains zero in on subtle details and connections between ideas, helping us catch unique signals in the crypto sphere.'
    },
    {
      icon: (
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
      ),
      title: 'Hyperfocus Mastery',
      description:
        'Dive deep into research or charts for hours without losing steam!',
      details:
        'When we’re passionate, we give 110%—and sometimes that intense focus uncovers the next big gem.'
    },
    {
      icon: (
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      title: 'Creative Problem-Solving',
      description: 'Lateral thinking leads to out-of-the-box ideas.',
      details:
        'We brainstorm fresh solutions others might never consider—perfect for Web3’s rapidly evolving landscape.'
    },
    {
      icon: (
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
      ),
      title: 'Unmatched Enthusiasm',
      description: 'Infectious excitement and drive keep projects thriving.',
      details:
        'When we’re “all in,” we’re unstoppable—our passion ignites teams, communities, and entire protocols!'
    }
  ];

  // ---------------------------------------
  // 2. DEFINE YOUR CELEBRITIES ARRAY HERE
  // ---------------------------------------
  const celebrities = [
    {
      name: 'Vitalik Buterin',
      role: 'Co-founder of Ethereum',
      type: 'Possibly ND? (Rumor/Speculation)',
      achievement:
        'Vitalik’s innovative vision created one of the largest crypto ecosystems and shaped smart contracts as we know them.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Vitalik_Buterin_TechCrunch_Berlin_2017_%28cropped%29.jpg/800px-Vitalik_Buterin_TechCrunch_Berlin_2017_%28cropped%29.jpg'
    },
    {
      name: 'Sam Bankman-Fried',
      role: 'Former CEO, FTX',
      type: 'Debated (some say ADHD or OCD behaviors)',
      achievement:
        'Rose to prominence for running FTX and Alameda Research. Also known for “questionable” decisions leading to controversies.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Sam_Bankman-Fried_President_of_FTX_Dec_2021.png/800px-Sam_Bankman-Fried_President_of_FTX_Dec_2021.png'
    },
    {
      name: 'Michael Saylor',
      role: 'Bitcoin Enthusiast & MicroStrategy CEO',
      type: 'ADHD? (Self-suspected, unconfirmed)',
      achievement:
        'A high-profile Bitcoin maxi who famously steered MicroStrategy into holding massive BTC reserves.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Michael_Saylor_Portrait.png/640px-Michael_Saylor_Portrait.png'
    }
  ];

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
                Hey fellow neurodivergent traders! 🚀 Let me tell you how our
                different ways of thinking are REVOLUTIONIZING crypto! From my
                ADHD-powered multi-chart analysis to my autistic pattern-spotting
                superpowers (and yes, I'll tell you about ALL the patterns I've
                found!), our unique perspectives are changing EVERYTHING! Want to
                hear about my latest 3 AM trading epiphany? 😄
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
                    of people are neurodivergent (that's SO many unique
                    perspectives!)
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
                    higher in tech (our brains LOVE this stuff!)
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
                    higher innovation rate (different perspectives = better
                    ideas!)
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
                  You know how everyone's always saying "think outside the
                  box"? Well, we're like "WHAT box?" Our brains just work
                  differently! Sometimes that means getting SUPER excited about
                  a new trading strategy at 3 AM, or creating the MOST detailed
                  spreadsheet you've ever seen, or coming up with solutions that
                  make people go "wait, HOW did you think of that?" It's not
                  better or worse - it's just DIFFERENT! And in crypto?
                  Different is our SUPERPOWER!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="component-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Different Perspectives
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Our unique way of thinking helps us spot opportunities
                      others might miss! (And sometimes leads to the MOST
                      interesting conversations! 😄)
                    </p>
                  </div>
                  <div className="component-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Intense Focus
                    </h3>
                    <p className="text-text-secondary text-sm">
                      When we're passionate about something, our dedication is
                      UNMATCHED! (Though we might need reminders for snack
                      breaks! 😅)
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
                    <h4 className="text-primary font-medium mb-2">
                      My Superpowers!
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        I can spot patterns NOBODY else sees!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Deep-diving into crypto for 12 hours? Easy!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
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
                    <h4 className="text-accent font-medium mb-2">
                      My Crypto Powers!
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Watching 7 charts at once? No problem!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Random 3 AM trading insights
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
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
                    <h4 className="text-accent font-medium mb-2">
                      My Trading Edge!
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Visual trading strategies FTW!
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Created my own chart color system
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
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
              <h2 className="text-heading-1 font-heading text-primary mb-4">
                Our Neurodivergent Superpowers!
              </h2>
              <p className="text-text-secondary text-sm md:text-base px-6 sm:px-8 lg:px-16">
                Let me tell you about our AMAZING abilities in Web3! (I've
                organized them into exactly 4 categories because that's the
                perfect number - and yes, I spent 6 hours color-coding and
                reorganizing until it was JUST right! My ADHD hyperfocus and
                autistic need for perfect organization teamed up on this one!
                😅)
              </p>
            </div>

            {/* Here we render the features array */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                return (
                  <div key={index} className="feature-card p-6">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-primary">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {feature.description}
                      </p>
                      <div className="pt-3 border-t border-primary/10">
                        <p className="text-text-secondary text-xs leading-relaxed">
                          {feature.details}
                        </p>
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
                From groundbreaking innovations to... uh... "creative"
                interpretations of financial regulations! Here's our collection
                of Web3's most notable neurodivergent minds (some for better,
                some for prison... I mean, worse! 😅)
              </p>
            </div>

            {/* Here we render the celebrities array */}
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
                      <p className="text-text-secondary text-sm">
                        {celebrity.role}
                      </p>
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
                Listen, in crypto, our different ways of thinking aren't just
                'quirks' - they're our SUPERPOWERS! That ADHD moment when you
                notice a trend because you were looking at 7 different charts at
                once? GENIUS! That autistic deep-dive that helps you understand
                EVERY detail of a protocol? INCREDIBLE! The way we can hyperfocus
                on research until we understand EVERYTHING? AMAZING! Even those
                times when we get super excited and info-dump about crypto to
                anyone who'll listen... that enthusiasm helps us spot
                opportunities others miss! (Want to hear my latest theory? I've
                got presentations, spreadsheets, AND mind maps! 😄)
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
                Did you know we've found EXACTLY 42 ways our different thinking
                styles create trading advantages? I've organized them into a
                color-coded system! Want to see my presentation? No? Maybe later
                then... (But it has REALLY cool animations! 😊)
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
