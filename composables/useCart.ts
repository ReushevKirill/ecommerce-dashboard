import type { ICart } from '~/app/types/api'
import { useCartStore } from '~/store/cartStore'

export const useCart = () => {
	const cartStore = useCartStore()
	const { cartItems } = storeToRefs(cartStore)
	const { addToCart, removeProduct, minusQuantity, plusQuantity } = cartStore

	const { _getItemBase, _setItemBase, _parseBase } = useLocalStorage()
	const CART_KEY_LS = 'cart'

	// Cart calculations
	// function reduce

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
		plusQuantity
	}
}
