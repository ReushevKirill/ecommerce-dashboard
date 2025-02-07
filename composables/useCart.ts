import type { ICart, ICartItem } from '~/app/types/api'
import { useCartStore } from '~/store/cartStore'

const CART_KEY_LS = 'cart'

export const useCart = (data?: globalThis.Ref<ICartItem>) => {
	const cartStore = useCartStore()
	const { cartItems, cart } = storeToRefs(cartStore)
	const { addToCart, removeProduct, minusQuantity, plusQuantity } = cartStore

	const { _getItemBase, _setItemBase, _parseBase } = useLocalStorage()
	const cartIsNotEmpty = computed(
		() => Object.values(cartItems.value).length > 0,
	)
	const oldPrice = computed(() => {
		return data
			? data.value.quantity *
					calcOldPrice(data.value.price, data.value.discountPercentage)
			: 0
	})

	const price = computed(() => {
		return data ? data.value.quantity * data.value.price : 0
	})

	// LocalStorage methods
	const getCartLS = _getItemBase<ICart>(CART_KEY_LS)
	const setCartLS = _setItemBase<ICart>(CART_KEY_LS)
	const parseCartLS = _parseBase<ICart>(CART_KEY_LS)

	return {
		cartItems,
		addToCart,
		removeProduct,
		getCartLS,
		setCartLS,
		parseCartLS,
		minusQuantity,
		plusQuantity,
		cart,
		cartIsNotEmpty,
		oldPrice,
		price,
	}
}
