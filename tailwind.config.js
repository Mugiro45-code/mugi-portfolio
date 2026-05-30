export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#050816',
        surface: '#0b1120',
        line: 'rgba(148, 163, 184, 0.14)',
        accent: '#8b5cf6',
        accentSoft: '#22d3ee',
      },
      boxShadow: {
        glass:
          '0 24px 80px rgba(2, 6, 23, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}