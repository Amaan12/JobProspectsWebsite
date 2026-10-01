/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        surface: '#0d111a',
        surfaceHover: '#131926',
        border: 'rgba(255, 255, 255, 0.07)',
        accent: {
          blue: '#3b82f6',
          emerald: '#10b981',
          amber: '#f59e0b',
          violet: '#8b5cf6',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Geist', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Geist', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        }
      }
    },
  },
  plugins: [],
}
