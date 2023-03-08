/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#DCDCDC',
        foreground: 'rgb(64, 60, 55)'
      }
    }
  },
  plugins: []
}
