/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage : {
        "bg-image" : "url('./src/assets/shubham-dhage-QhzCpzYSfqw-unsplash.jpg')",
        "bgg-image" : "url('../src/assets/shubham-dhage-QhzCpzYSfqw-unsplash.jpg')"
      }
    },
  },
  plugins: [],
}

