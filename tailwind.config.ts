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
        'bg-light': '#FFFFFF',
        'bg-alt': '#F7F8FA',
        'accent': '#0EA5E9',
        'accent-hover': '#0284C7',
        'text-primary': '#0A0A0A',
        'text-muted': '#6B7280',
        'border-soft': '#e5e7eb',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
