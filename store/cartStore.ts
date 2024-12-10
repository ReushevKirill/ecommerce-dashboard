import type { ICart, ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
	const isLoading = ref(false)
	const error = ref(null)

	const cart = ref<ICart>({} as ICart)
	const cartItems = computed(() => cart.value?.products)

	const { getCartLS, setCartLS, parseCartLS } = useCart()

	function saveToLocalStorage() {
		return setCartLS(JSON.stringify(cart.value))
	}

	function getExistsItemById(id: number) {
		return cart.value.products.find(i => i.id === id)
	}

	function formingNewProduct(product: ProductType) {
		const { id, title, price, discountPercentage, thumbnail } = product
		const newFields = {
			quantity: 1,
			total: price,
			discountedTotal: calcDiscountProduct(price, discountPercentage),
		}
		return {
			...newFields,
			id,
			title,
			price,
			discountPercentage,
			thumbnail,
		}
	}

	function addToCart(product: ProductType) {
		if (product.stock === 0) return

		const existingItem = getExistsItemById(product.id)

		if (!existingItem) {
			const reducedProduct = formingNewProduct(product)
			cart.value.products.push(reducedProduct)
		} else if (existingItem?.quantity < product.stock) {
			console.log(existingItem.quantity);
			existingItem.quantity++
			console.log(existingItem.quantity);
		}
	}

	function deleteFromCart(id: number) {
		cart.value.products = cart.value.products.filter(i => i.id !== id)
	}

	function loadFromLocalStorage(): any {
		const savedCart = getCartLS()
		if (savedCart) {
			return parseCartLS()
		}
	}

	async function fetchCart() {
		try {
			const data = await fetchFromAPI('/carts/1', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			return data
		} catch (e: Error | any) {
			error.value = e?.message
		}
	}

	async function loadCart() {
		try {
			isLoading.value = true
			const localData = loadFromLocalStorage()
			// const dataFetch = await fetchCart()
			cart.value = localData
		} catch (e: Error | any) {
			error.value = e?.message
		} finally {
			isLoading.value = false
		}
	}

	watch(
		cart,
		() => {
			saveToLocalStorage()
		},
		{ deep: true }
	)

	return {
		cart,
		isLoading,
		error,
		cartItems,
		addToCart,
		deleteFromCart,
		loadCart,
	}
})
