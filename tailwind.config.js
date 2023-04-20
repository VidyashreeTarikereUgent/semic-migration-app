/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        background: 'white',
        foreground: 'beige'
      }
    }
  },
  plugins: []
}
