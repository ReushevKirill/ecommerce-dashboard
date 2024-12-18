// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/styles/main.scss'],
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#ff7d31',
              background: '#f2f2f2'
            }
          }
        }
      },
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    },
  }
})