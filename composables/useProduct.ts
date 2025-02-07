import type { ProductType } from '~/app/types/api'

export function useProduct(data: ProductType) {
	const oldPrice = computed(() => {
		return calcOldPrice(data.price, data.discountPercentage)
	})

	return {
		oldPrice,
	}
}
