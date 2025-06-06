
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        study: {
          primary: 'hsl(var(--study-primary))',
          secondary: 'hsl(var(--study-secondary))',
        },
        chill: {
          primary: 'hsl(var(--chill-primary))',
          secondary: 'hsl(var(--chill-secondary))',
        },
        party: {
          primary: 'hsl(var(--party-primary))',
          secondary: 'hsl(var(--party-secondary))',
        },
        gift: {
          primary: 'hsl(var(--gift-primary))',
          secondary: 'hsl(var(--gift-secondary))',
        },
        custom: {
          primary: 'hsl(var(--custom-primary))',
          secondary: 'hsl(var(--custom-secondary))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spin-wheel': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(var(--spin-amount, 1440deg))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-10px)', opacity: '1' },
          '100%': { transform: 'translateY(100px) rotate(720deg)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(99, 166, 255, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(99, 166, 255, 0.8)',
            transform: 'scale(1.05)'
          },
        },
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'enter-zoom': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'exit-zoom': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-wheel': 'spin-wheel 5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'confetti-fall': 'confetti-fall 3s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-once': 'bounce-once 0.5s ease-in-out',
        'enter-zoom': 'enter-zoom 0.3s ease-out',
        'exit-zoom': 'exit-zoom 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
