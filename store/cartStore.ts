import type { ICart, ICartItem, ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
	const isLoading = ref(false)
	const error = ref(null)

	const cart = ref<ICart>({
		id: 1,
		products: [],
		total: 0,
		discountedTotal: 0,
		userId: 1,
		totalProducts: 0,
		totalQuantity: 0,
	})

	const cartItems = computed(() => cart.value?.products)

	const { getCartLS, setCartLS, parseCartLS } = useCart()

	function getExistsItemById(id: number) {
		return cart.value.products.find(i => i.id === id)
	}

	function formingNewProduct(product: ProductType): ICartItem {
		return {
			id: product.id,
			title: product.title,
			price: product.price,
			quantity: 1,
			total: product.price,
			discountPercentage: product.discountPercentage,
			discountedPrice: calcDiscountProductPrice(
				product.price,
				product.discountPercentage
			),
			thumbnail: product.thumbnail,
		}
	}

	async function addToCart(product: ProductType) {
		if (product.stock === 0) return

		const existingItem = getExistsItemById(product.id)

		if (!existingItem) {
			addProduct(formingNewProduct(product))
		} else if (existingItem?.quantity < product.stock) {
			console.log('update product')
		}
	}

	function addProduct(product: ICartItem) {
		cart.value.products.push(product)
	}

	async function saveCart() {
		saveToLocalStorage()
	}

	function deleteFromCart(id: number) {
		cart.value.products = cart.value.products.filter(i => i.id !== id)
	}

	function loadFromLocalStorage() {
		if (!getCartLS()) return null
		return parseCartLS()
	}

	function saveToLocalStorage() {
		return setCartLS(JSON.stringify(cart.value))
	}

	async function fetchCart() {
		try {
			const data = await useServerFetch<ICart>('/carts/1', {
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
			const cartData = loadFromLocalStorage()
			if (cartData) {
				cart.value = cartData
			}
		} catch (e: Error | any) {
			error.value = e?.message
		} finally {
			isLoading.value = false
		}
	}

	watch(
		cart,
		() => {
			saveCart()
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
