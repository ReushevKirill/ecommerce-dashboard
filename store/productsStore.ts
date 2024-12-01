import { defineStore } from 'pinia'
import type { ProductType } from '~/app/types/api'

export const useProductStore = defineStore('product', () => {
	const products = ref<ProductType[]>([])
	const isLoading = ref(false)
	const error = ref(null)

	const config = useRuntimeConfig()
	const BASE_URL = config.public.apiBase || 'https://dummyjson.com'

	async function fetchProducts() {
		if (products.value.length > 0) {
			return products
		}
		const data: { products: ProductType[] } = await $fetch('/products?limit=0', {
			baseURL: BASE_URL,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		products.value = data?.products ?? []

		return products
	}

	return {
		products,
		isLoading,
		error,
		fetchProducts,
	}
})
