import { useCartStore } from '~/store/cartStore'

export const useCart = () => {
	const cartStore = useCartStore()
	const { cartItems } = storeToRefs(cartStore)
	const { addToCartStore, deleteFromCartStoreById } = cartStore

	return {
		cartItems,
		addToCartStore,
		deleteFromCartStoreById
	}
}
