/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blush-50": "#fff8f8",
        "blush-100": "#fef0f2",
        "blush-200": "#ffd9de",
        "blush-300": "#fcb3be",
        "blush-400": "#f47e92",
        "blush-500": "#e0526e",
        "rose-earth": "#874e58",
        "rose-dark": "#512c33",
        "sage-green": "#486730",
        "sage-soft": "#c9eea9",
        "warm-parchment": "#fdfaf6",
        "cream-card": "#ffffff",
        "gold-soft": "#e8c482",
        "ink-soft": "#2d2426"
      },
      fontFamily: {
        headline: ["Playfair Display", "serif"],
        handwriting: ["Caveat", "cursive"],
        sans: ["Plus Jakarta Sans", "sans-serif"]
      },
      animation: {
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'float-delayed': 'floatSlow 4s ease-in-out 2s infinite',
        'sway': 'sway 3s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'wag': 'tailWag 1.8s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite'
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        sway: {
          '0%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(3deg)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        tailWag: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(12deg)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        }
      }
    },
  },
  plugins: [],
}
