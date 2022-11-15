/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "th-dark": "#111319",
        "th-green": "#1CC749",
        "th-gray": "#414247",
        "th-drak-gray": "#23252B",
        "th-orange": "#E66F20",
        "th-brown": "#F4CB9B",
      },
    },
  },
  plugins: [],
};
