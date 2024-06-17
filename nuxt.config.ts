export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: { SECRET: process.env.AUDIUS_SECRET_KEY, KEY: process.env.AUDIUS_API_KEY, },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/harlem",
    "nuxt-icon",
    "@nuxtjs/device",
  ],
  googleFonts: {
    families: {
      Lexend: '100..900',
    }
  },
  app: {
    head: {
      title: 'MOOD™',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: "/favicon.png" },
        { rel: 'manifest', href: "/manifest.json" }
      ],
      meta: [
        {
          property: 'og:site_name',
          content: 'MOOD™',
        },
        {
          name: 'theme-color',
          content: '#d9934f',
        },
      ],
    },
    htmlAttrs: {
      'data-theme': 'cupcake'
    },
  },
  router: {
    middleware: ['auth-callback']
  }
})