// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      apiBase: 'https://dummyjson.com'
    }
  },
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#ff7d31',
              background: '#f2f2f2'
            }
          }
        }
      }
    }
  }
})