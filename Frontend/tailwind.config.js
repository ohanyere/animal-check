/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        // "soft-gray-20" : "#CCEAD7",
        "dark-green-20" : "#2C4A3F",
        "dark-green-100" : "#2c4e36",
        "soft-green-20" : "#388E3C",
        "soft-green-100" : "#dee8d9"
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
    },
  },
  plugins: [],
}

