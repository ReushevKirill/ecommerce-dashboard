import { defineStore } from 'pinia'
import type { ICategory } from '~/app/types/api'

export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref<ICategory[]>([])
	const isLoading = ref(false)
	const error = ref(null)

	const {
		api: { baseURL },
	} = useAppConfig()

	async function fetchAllCategories() {
		try {
			isLoading.value = true
			const data = await $fetch('/products/categories', {
				baseURL: baseURL,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			categories.value = data as ICategory[]
		} catch (e: Error | any) {
			error.value = e?.message
		} finally {
			isLoading.value = false
		}
	}

	return {
		categories,
		isLoading,
		error,
		fetchAllCategories,
	}
})
