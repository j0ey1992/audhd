import React from 'react';

function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-[#F8F9FF] via-[#F0F2FF] to-[#E8EAFF] pt-28 pb-20 overflow-hidden">
      {/* Modern Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70"></div>
      
      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),transparent_80%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text Content */}
          <div className="flex-1 max-w-3xl mx-auto text-center lg:text-left space-y-8">
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-primary">
              Autistic Investor
            </h1>

            <div className="space-y-4">
              <p className="text-2xl lg:text-3xl text-gray-600 font-heading">
                Where <span className="font-bold text-primary">hyperfocus</span> meets
                <span className="font-bold text-primary/90 ml-2">crypto</span>
              </p>
              <p className="text-2xl lg:text-3xl text-gray-600 font-heading">
                Turning <span className="font-bold text-primary">pattern recognition</span> into
                <span className="font-bold text-primary/90 ml-2">profits</span>
              </p>
            </div>

            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              {/* Discord-style Join Community Button */}
              <button className="px-8 py-3 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors flex items-center justify-center gap-2 group">
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                </svg>
                <span className="font-heading text-lg">Join Community</span>
              </button>

              {/* Buy Token Button */}
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary transition-all duration-300 flex items-center justify-center gap-2 group">
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
                <span className="font-heading text-lg">Buy Token</span>
              </button>
            </div>

            {/* Launch Platforms */}
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <p className="text-gray-600 font-heading mb-4">Launching on</p>
              <div className="flex items-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                {/* Cronos Logo */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <svg width="24" height="24" viewBox="0 0 500 500" className="w-8 h-8">
                    <path d="M250 500C388.071 500 500 388.071 500 250C500 111.929 388.071 0 250 0C111.929 0 0 111.929 0 250C0 388.071 111.929 500 250 500Z" fill="#002D74"/>
                    <path d="M326.958 125.786L275.338 177.406C268.917 183.827 258.564 183.827 252.143 177.406L200.523 125.786C194.102 119.365 194.102 109.012 200.523 102.591L252.143 50.9707C258.564 44.5497 268.917 44.5497 275.338 50.9707L326.958 102.591C333.379 109.012 333.379 119.365 326.958 125.786Z" fill="#1199FA"/>
                    <path d="M424.574 223.402L372.954 275.022C366.533 281.443 356.18 281.443 349.759 275.022L298.139 223.402C291.718 216.981 291.718 206.628 298.139 200.207L349.759 148.587C356.18 142.166 366.533 142.166 372.954 148.587L424.574 200.207C430.995 206.628 430.995 216.981 424.574 223.402Z" fill="#1199FA"/>
                    <path d="M326.958 321.018L275.338 372.638C268.917 379.059 258.564 379.059 252.143 372.638L200.523 321.018C194.102 314.597 194.102 304.244 200.523 297.823L252.143 246.203C258.564 239.782 268.917 239.782 275.338 246.203L326.958 297.823C333.379 304.244 333.379 314.597 326.958 321.018Z" fill="#1199FA"/>
                    <path d="M229.342 223.402L177.722 275.022C171.301 281.443 160.948 281.443 154.527 275.022L102.907 223.402C96.4861 216.981 96.4861 206.628 102.907 200.207L154.527 148.587C160.948 142.166 171.301 142.166 177.722 148.587L229.342 200.207C235.763 206.628 235.763 216.981 229.342 223.402Z" fill="#1199FA"/>
                  </svg>
                  <span className="font-heading font-bold text-[#002D74]">Cronos</span>
                </div>

                {/* Solana Logo */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <svg width="24" height="24" viewBox="0 0 397 311" className="w-8 h-8">
                    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="#9945FF"/>
                    <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="#19FB9B"/>
                    <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="#00C2FF"/>
                  </svg>
                  <span className="font-heading font-bold bg-gradient-to-r from-[#9945FF] to-[#19FB9B] bg-clip-text text-transparent">Solana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wojak Image */}
          <div className="lg:flex-1 w-full max-w-[500px]">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/10 p-8 transform group-hover:scale-[1.02] transition-all duration-500">
                <img
                  src="/wojak_studio.png"
                  alt="Wojak Trader"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
