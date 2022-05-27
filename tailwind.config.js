module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: "#4E6DFF",
          extraDark: "#090A27",
          darkLight: "#19223C",
        },
        fontFamily: {
          courgette: "Courgette, cursive",
          montserrat: ["Montserrat", "sans-serif"],
        },
        screens: {
          lgLikeCard: "1800px",
          cardLaptopBreakpoint: "1130px",
        },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  };