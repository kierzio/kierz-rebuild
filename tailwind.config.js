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
          'cyber-dark': 'var(--color-cyber-dark)',
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
          'ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        },
        boxShadow: {
          'neon-blue': '0 0 5px 0 var(--color-neon-blue), 0 0 10px 0 var(--color-neon-blue)',
          'neon-purple': '0 0 5px 0 var(--color-neon-purple), 0 0 10px 0 var(--color-neon-purple)',
        },
        keyframes: {
          ping: {
            '0%': { transform: 'scale(0)', opacity: 1 },
            '75%, 100%': { transform: 'scale(2.5)', opacity: 0 },
          },
        },
        transitionDelay: {
          '100': '100ms',
          '300': '300ms',
          '500': '500ms',
        }
      },
    },
    plugins: [],
  }