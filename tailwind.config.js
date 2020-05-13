module.exports = {
  purge: ["./src/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "Roboto",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],

        display: ["Playfair Display"],
        maintitle: ["Euphoria Script", "cursive"],
      },
      fontSize: {
        "7xl": "5rem",
      },
    },
  },
};
