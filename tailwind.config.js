/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A', // Dark gray for text
        secondary: '#404040', // Medium gray
        accent: '#FF6B6B', // Vibrant accent color
        background: '#FAFAFA', // Very light background
        surface: '#FFFFFF', // White for cards/sections
        text: '#1A1A1A', // Dark gray for body text
        'text-secondary': '#707070', // Muted gray
        highlight: '#FFD700', // Gold for emphasis
        meme: '#8A2BE2', // Meme purple (used sparingly)
        degen: '#00FF7F', // Crypto green (used sparingly)
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
  plugins: [],
}
