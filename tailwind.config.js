/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        soundify: {
          bg: "#07080b",
          card: "#0b0c12",
          border: "#27272a",
          purple: "#9333ea",
          fuchsia: "#d946ef",
        }
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.9)',
      }
    },
  },
  plugins: [],
}