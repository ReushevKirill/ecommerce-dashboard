import { defineStore } from 'pinia'
import type { ProductType } from '~/app/types/api'

export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref<ProductType[]>([])
	const isLoading = ref(false)
	const error = ref(null)

	const {
		api: { baseURL },
	} = useAppConfig()

	async function fetchAllCategories() {
		try {
			isLoading.value = true
			const data = await $fetch(
				'/products/categories',
				{
					baseURL: baseURL,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			categories.value = data
		} catch (e: Error | any) {
			error.value = e?.message
		} finally {
			isLoading.value = false
		}
	}

	async function getAllCategories() {}

	return {
		categories,
		isLoading,
		error,
		fetchAllCategories,
	}
})
