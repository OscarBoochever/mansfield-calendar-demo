import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Mansfield official brand colors (from mansfieldtexas.gov)
        mansfield: {
          navy: '#002D72',
          'navy-light': '#003d99',
          'navy-dark': '#001739',
          green: '#255929',
          'green-light': '#2d6b32',
          'green-dark': '#1d4620',
          gold: '#AC8400',
          'gold-light': '#c99a00',
          'gold-dark': '#8a6a00',
        },
        // Primary - Mansfield Navy Blue
        primary: {
          50: '#e6edf7',
          100: '#ccdaef',
          200: '#99b5df',
          300: '#6690cf',
          400: '#336bbf',
          500: '#002D72',
          600: '#00245b',
          700: '#001b44',
          800: '#00122e',
          900: '#000917',
          950: '#00050c',
        },
        // Secondary - Mansfield Forest Green
        secondary: {
          50: '#e8f0e9',
          100: '#d1e1d3',
          200: '#a3c3a7',
          300: '#75a57b',
          400: '#47874f',
          500: '#255929',
          600: '#1e4721',
          700: '#163519',
          800: '#0f2411',
          900: '#071208',
          950: '#040904',
        },
        // Accent - Mansfield Gold
        accent: {
          50: '#fdf8e6',
          100: '#fbf1cc',
          200: '#f7e399',
          300: '#f3d566',
          400: '#efc733',
          500: '#AC8400',
          600: '#8a6a00',
          700: '#675000',
          800: '#453500',
          900: '#221b00',
          950: '#110d00',
        },
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-success': 'pulseSuccess 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSuccess: {
          '0%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
