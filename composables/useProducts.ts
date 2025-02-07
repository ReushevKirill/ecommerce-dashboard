import { useProductStore } from '~/store/productsStore'

export const useProducts = () => {
	const productStore = useProductStore()
	const { products, isLoading, error } = storeToRefs(productStore)

	return {
		products,
		productsLoading: isLoading,
		productsError: error,
	}
}
