/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "orange",
      },
      gridTemplateColumns: {
        "serviceCard": '1.2fr 1fr 2.5fr 0.4fr' 
      }
    },
  },
  plugins: [],
}

