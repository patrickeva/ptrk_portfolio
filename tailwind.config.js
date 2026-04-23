/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  corePlugins: {
    // Disable the CSS reset so it doesn't conflict with the existing styles
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'neon-cyan':    '#1CB2DF',
        'neon-purple':  '#7c3aed',
        'midnight':     '#080820',
        'midnight-mid': '#0e0e2c',
        'slate-deep':   '#0f172a',
      },
      fontFamily: {
        space:   ['"Space Grotesk"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        neon:         '0 0 20px rgba(28, 178, 223, 0.4)',
        'neon-lg':    '0 0 40px rgba(28, 178, 223, 0.6)',
        'glow-purple':'0 0 20px rgba(124, 58, 237, 0.4)',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
}
