// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: https://gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import "~/assets/css/base.postcss";
import VueLuxon from "vue-luxon";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(VueLuxon, {
    clientZone: "America/Toronto",
  });

  var marked = require("marked");
  marked.setOptions({
    smartypants: true,
    gfm: true,
  });
  Vue.mixin({
    methods: {
      marked: function(input) {
        return marked(input);
      },
    },
  });

  head.htmlAttrs = { lang: "en" };
  head.bodyAttrs = { class: "antialiased font-body font-serif" };

  // Styles
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Euphoria+Script&family=Playfair+Display&Roboto&display=swap",
  });

  // Basic meta tags
  head.meta.push({
    name: "author",
    content: "Amanda Lee Caskie",
  });
  // Open Graph + Twitter meta tags
  head.meta.push({
    property: "og:description",
    content:
      "Amanda Lee Caskie is a Northern Ontario Native and has lived in Toronto for over 18 years. She is a hairstylist and educator, a jewellery maker and yoga teacher.",
  });

  head.meta.push({
    name: "twitter:description",
    content:
      "Amanda Lee Caskie is a Northern Ontario Native and has lived in Toronto for over 18 years. She is a hairstylist and educator, a jewellery maker and yoga teacher.",
  });

  head.meta.push({
    property: "og:type",
    content: "website",
  });

  head.meta.push({
    property: "og:title",
    content: "",
  });

  head.meta.push({
    name: "twitter:title",
    content: "",
  });

  head.meta.push({
    name: "twitter:card",
    content: "summary_large_image",
  });

  head.meta.push({
    name: "twitter:creator",
    content: "",
  });

  head.meta.push({
    property: "og:image",
    content: "",
  });

  head.meta.push({
    name: "twitter:image",
    content: "",
  });
}
