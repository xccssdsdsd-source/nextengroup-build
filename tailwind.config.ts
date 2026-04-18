import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#020810',
        'bg-left': '#030d1a',
        'bg-right': '#0a1f3d',
        cyan: '#00d4ff',
        'blue-brand': '#1a6fff',
        'blue-mid': '#0d4fc7',
        'text-brand': '#e8f0ff',
        muted: '#4a6080',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        figtree: ['var(--font-figtree)', 'sans-serif'],
        barlow: ['var(--font-barlow)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
