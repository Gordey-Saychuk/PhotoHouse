// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  app: {

    head: {
      // viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0',
      script: [
        {
          src: `https://telegram.org/js/telegram-web-app.js`,
          async: true,
          defer: true
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@nuxt/ui',
    'nuxt-swiper',
    '@pinia/nuxt',
  ],
  colorMode: {
    preference: 'dark'
  },
  css: ['assets/scss/style.scss'],
  vite: {
    server: {
      allowedHosts: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["import"]
        }
      }
    }
  },
})