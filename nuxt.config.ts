export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxtjs/harlem", "nuxt-icon"],
  googleFonts: {
    families: {
      Lexend: '100..900'
    }
  },
  app: {
    head: {
      title: 'MOOD™',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: "/favicon-dark.svg" }
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
})