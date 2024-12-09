import type { ProductType, ProductTypeCart } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
  const defaultState: ProductTypeCart[] = []

  const cartItems = ref<typeof defaultState>(defaultState)

	const { getCartLS, setCartLS, parseCartLS } = useCart()
  
	function saveToLocalStorage() {
			return setCartLS(JSON.stringify(cartItems.value))
	}

	function deleteFromLocalStorage(products: ProductType[]) {
		return setCartLS(JSON.stringify(products))
	}

  function addToCart(product: ProductType) {

		if (product.stock === 0) return

		const existingItem = cartItems.value.find(p => p.id === product.id)

		if (!existingItem) {
			cartItems.value.push({...product, quantity: 1})
		} else if (existingItem?.quantity < existingItem.stock) {
			existingItem.quantity++
		}

		saveToLocalStorage()
	}

  function deleteFromCart(id: number) {
		cartItems.value = cartItems.value.filter(i => i.id !== id)
		deleteFromLocalStorage(cartItems.value)
	}

  function loadFromLocalStorage() {
    const savedCart = getCartLS()
    if (savedCart) {
      cartItems.value = parseCartLS()
    }
  }

	return { cartItems, addToCart, deleteFromCart, loadFromLocalStorage }
})
