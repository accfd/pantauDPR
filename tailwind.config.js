/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        heroGreen: "#1b602f", // hijau gelap
        bravePink: "#f784c5", // pink berani
      },
    },
  },
  plugins: [],
}
