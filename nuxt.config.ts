// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-swiper',
    '@pinia/nuxt',
  ],
  colorMode: {
    preference: 'dark'
  },
  css: ['assets/scss/style.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["import"]
        }
      }
    }
  },
})