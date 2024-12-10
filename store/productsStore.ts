import { defineStore } from 'pinia'
import type { ProductType } from '~/app/types/api'

export const useProductStore = defineStore('product', () => {
	const products = ref<ProductType[]>([])
	const isLoading = ref(false)
	const error = ref(null)

	const {
		api: { baseURL },
	} = useAppConfig()

	async function fetchAllProducts() {
		try {
			isLoading.value = true
			const data: { products: ProductType[] } = await fetchFromAPI(
				'/products?limit=0',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			products.value = data?.products
		} catch (e: Error | any) {
			error.value = e?.message
		} finally {
			isLoading.value = false
		}
	}

	return {
		products,
		isLoading,
		error,
		fetchAllProducts,
	}
})
