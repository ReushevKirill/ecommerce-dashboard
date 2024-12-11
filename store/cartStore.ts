import type { ICart, ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
	const isLoading = ref(false)
	const error = ref(null)

	const cart = ref<ICart>({} as ICart)
	const cartItems = computed(() => cart.value?.products)

	const { getCartLS, setCartLS, parseCartLS } = useCart()

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

	async function addToCart(product: ProductType) {
		if (product.stock === 0) return

		const existingItem = getExistsItemById(product.id)

		if (!existingItem) {
			addProductById(product.id)
			// cart.value.products.push(formingNewProduct(product))
		} else if (existingItem?.quantity < product.stock) {
			// existingItem.quantity++
		}
	}

	async function addProductById(id: number) {
		try {
			const { data } = await useAsyncData('newProduct', () => {
				return fetchFromAPI('/carts/1', {
					headers: { 'Content-Type': 'application/json' },
					method: 'PUT',
					body: {
						merge: true,
						products: [
							{
								id,
								quantity: 1,
							},
						],
					},
				})
			})
			console.log(data.value)
		} catch (e: Error | any) {
			console.log(e?.message)
		}
	}

	async function updateProduct(product: ProductType) {}

	function deleteFromCart(id: number) {
		cart.value.products = cart.value.products.filter(i => i.id !== id)
	}

	// function loadFromLocalStorage(): any {
	// 	if (getCartLS()) {
	// 		return parseCartLS()
	// 	}
	// }

	// function saveToLocalStorage() {
	// 	return setCartLS(JSON.stringify(cart.value))
	// }

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
			// const localData = loadFromLocalStorage()
			const fetchData = await fetchCart()
			cart.value = fetchData
		} catch (e: Error | any) {
			error.value = e?.message
		} finally {
			isLoading.value = false
		}
	}

	// watch(
	// 	cart,
	// 	() => {
	// 		saveToLocalStorage()
	// 	},
	// 	{ deep: true }
	// )

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
