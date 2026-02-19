import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom PromptBase color palette
        bg: {
          primary: '#1a1a2e',
          secondary: '#232339',
          tertiary: '#3a3a5c',
        },
        border: {
          DEFAULT: '#2a2a45',
        },
        text: {
          primary: '#f8f9fa',
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
        accent: {
          gold: '#e6cc80',
          blue: '#96daff',
          green: '#6ed654',
          red: '#ff7676',
        },
      },
      fontFamily: {
        sans: ['var(--font-finlandica)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '20px',
      },
      boxShadow: {
        'card': '2px 3px 9px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 5px 20px 10px rgba(0, 0, 0, 0.15)',
        'search': '0 2px 6px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
        'slide-down': 'slide-down 0.2s ease-out',
        'gradient-flow': 'gradient-flow 60s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
      keyframes: {
        'skeleton-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(122deg, #ffd7a5 0%, #ff9a9a 50%, #ff7676 100%)',
        'gradient-skeleton': 'linear-gradient(270deg, #2a2a45 0%, #3a3a5c 100%)',
      },
      maxWidth: {
        'container': '1400px',
      },
    },
  },
  plugins: [],
}

export default config
