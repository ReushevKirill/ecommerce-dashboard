export default defineAppConfig({
	api: {
		baseURL: 'https://dummyjson.com',
	},
	icon: {
		class: 'icon',
	},
	routes: {
		home: {
			slug: 'home',
			name: 'Home',
			path: '/',
		},
	},
})
