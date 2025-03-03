// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@hexdigital/nuxt-datocms'
  ],
  
  datocms: {
    publicReadOnlyToken: process.env.DATO_API_KEY || '',
  },
  
  css: [
    '@/assets/css/main.css'
  ],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      bodyAttrs: { class: 'antialiased font-body font-sans' },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Euphoria+Script&family=Playfair+Display&family=Roboto:wght@400;700&display=swap'
        }
      ],
      meta: [
        { name: 'author', content: 'Amanda Lee Caskie' },
        { 
          property: 'og:description',
          content: 'Amanda Lee Caskie is a Northern Ontario Native and has lived in Toronto for over 18 years. She is a hairstylist and educator, a jewellery maker and yoga teacher.' 
        },
        {
          name: 'twitter:description',
          content: 'Amanda Lee Caskie is a Northern Ontario Native and has lived in Toronto for over 18 years. She is a hairstylist and educator, a jewellery maker and yoga teacher.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '' },
        { name: 'twitter:title', content: '' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '' },
        { property: 'og:image', content: '' },
        { name: 'twitter:image', content: '' }
      ]
    }
  }
})
