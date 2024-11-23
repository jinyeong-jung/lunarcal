/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        plex: ["IBM Plex Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
