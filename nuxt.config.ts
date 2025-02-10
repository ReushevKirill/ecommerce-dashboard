// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	css: ['@/assets/styles/main.scss'],
	modules: [
		'@pinia/nuxt',
		'vuetify-nuxt-module',
		'@nuxt/image',
		'@nuxt/icon',
		'@nuxt/eslint',
	],
	eslint: {
		config: {
			stylistic: true,
		},
	},
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './'),
			},
		},
	},
})
