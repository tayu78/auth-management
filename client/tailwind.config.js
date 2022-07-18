/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      'icon' : '350px'
    },
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 500px))',
        'auto-fill': 'repeat(auto-fill, minmax(300px, 500px))',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 600px))',
        'auto-fill': 'repeat(auto-fill, minmax(300px, 600px))',
      },
    },
  },
  plugins: [],
}
