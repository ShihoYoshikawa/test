/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00e5ff',
        'neon-pink': '#ff00e5',
        'neon-purple': '#a855f7',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shake': 'shake 0.3s ease-in-out',
        'float-up': 'float-up 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
