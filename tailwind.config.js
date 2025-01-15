/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
    "!./src/**/*.module.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        highlight: 'rgb(var(--highlight) / <alpha-value>)',
        meme: '#8A2BE2',
        degen: '#00FF7F',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        degen: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1', fontWeight: '700' }],
        'heading-1': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-2': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
      keyframes: {
        'move-grid': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-40px, -40px)' },
        },
        'move-lines': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-40px)' },
        },
        'move-lines-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-40px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-reverse-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
      },
      animation: {
        'move-grid': 'move-grid 10s linear infinite',
        'move-lines': 'move-lines 2s linear infinite',
        'move-lines-vertical': 'move-lines-vertical 3s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-reverse-slow': 'float-reverse-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function({ addBase, addComponents, addUtilities }) {
      addBase({
        // White Mode (Default)
        ':root': {
          '--primary': '26 26 26',
          '--secondary': '64 64 64',
          '--accent': '255 107 107',
          '--background': '250 250 250',
          '--surface': '255 255 255',
          '--text': '26 26 26',
          '--text-secondary': '112 112 112',
          '--highlight': '255 215 0',
          '--line-height': '1.5',
          '--letter-spacing': '0',
          '--font-weight': '400',
        },
        // Dark Mode
        '[data-theme="dark"]': {
          '--primary': '255 255 255',
          '--secondary': '200 200 200',
          '--accent': '255 107 107',
          '--background': '13 17 23',
          '--surface': '30 35 42',
          '--text': '255 255 255',
          '--text-secondary': '200 200 200',
          '--highlight': '255 215 0',
          '--line-height': '1.5',
          '--letter-spacing': '0',
          '--font-weight': '400',
        },
        // ADHD Mode
        '[data-theme="adhd"]': {
          '--primary': '26 26 26',
          '--secondary': '64 64 64',
          '--accent': '255 107 107',
          '--background': '245 245 220', // Beige background for reduced visual stress
          '--surface': '252 252 252',
          '--text': '26 26 26',
          '--text-secondary': '112 112 112',
          '--highlight': '255 215 0',
          '--line-height': '2', // Increased line height for better readability
          '--letter-spacing': '0.05em', // Slightly increased letter spacing
        },
        // Autism Mode
        '[data-theme="autism"]': {
          '--primary': '26 26 26',
          '--secondary': '64 64 64',
          '--accent': '100 149 237', // Cornflower blue - calming color
          '--background': '240 248 255', // Alice blue - soft, calming background
          '--surface': '255 255 255',
          '--text': '26 26 26',
          '--text-secondary': '112 112 112',
          '--highlight': '173 216 230', // Light blue - gentle highlight
          '--line-height': '1.8',
        },
        // Dyslexia Mode
        '[data-theme="dyslexia"]': {
          '--primary': '44 62 80', // Dark blue-gray
          '--secondary': '64 64 64',
          '--accent': '52 152 219', // Bright blue
          '--background': '253 246 227', // Warm cream background
          '--surface': '255 255 255',
          '--text': '44 62 80',
          '--text-secondary': '112 112 112',
          '--highlight': '241 196 15',
          '--line-height': '1.8',
          '--letter-spacing': '0.1em', // Increased letter spacing for dyslexia
          '--font-weight': '500', // Slightly bolder text
        },
      });

      addComponents({
        '.full-bleed': {
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          position: 'relative',
        },
        '.full-width-container': {
          width: '100vw',
          maxWidth: 'none',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          position: 'relative',
          '& > *': {
            maxWidth: '100%',
            margin: '0 auto',
          }
        }
      });
    },
  ],
}
