/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'var(--color-neon-blue)',
        'neon-purple': 'var(--color-neon-purple)',
        'neon-pink': 'var(--color-neon-pink)',
        'neon-pink-alt': 'var(--color-neon-pink-alt)',
        'cyber-dark': 'var(--color-cyber-dark)',
        'cyber-dark-alt': 'var(--color-cyber-dark-alt)',
        'cyber-light': 'var(--color-cyber-light)',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'glowPulse': 'glowPulse 2s infinite',
        'blink': 'blink 1s ease-in-out infinite',
        'gradientFlow': 'gradientFlow 6s ease infinite',
        'floatUp': 'floatUp 3s ease-in-out infinite',
      },
      boxShadow: {
        'neon-blue': '0 0 5px 0 var(--color-neon-blue), 0 0 10px 0 var(--color-neon-blue)',
        'neon-purple': '0 0 5px 0 var(--color-neon-purple), 0 0 10px 0 var(--color-neon-purple)',
        'neon-pink': '0 0 5px 0 var(--color-neon-pink), 0 0 10px 0 var(--color-neon-pink)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to right, var(--color-neon-blue), var(--color-neon-purple))',
        'cyber-gradient-alt': 'linear-gradient(to right, var(--color-neon-purple), var(--color-neon-pink))',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}