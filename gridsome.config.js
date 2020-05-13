const postcssNested = require("postcss-nested");

module.exports = {
  siteName: "Amanda Lee Caskie",

  titleTemplate: "%s",
  icon: "./src/assets/img/favicon.png",
  plugins: [
    {
      use: "@gridsome/source-datocms",
      options: {
        apiToken: process.env.dato_api_key,
        previewMode: false,
        apiUrl: "https://site-api.datocms.com",
        typeName: "Dato",
      },
    },
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./tailwind.config.js",
      },
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcssNested],
      },
    },
  },
};
// All configuration options: https://gridsome.org/docs/config
