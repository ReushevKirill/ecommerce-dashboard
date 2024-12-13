import type { ICart, ICartItem, ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
	const isLoading = ref(false)
	const error = ref<Error | null>(null)

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
		return cart.value.products.find(i => i.id === id) ?? null
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
			updateProduct(existingItem)
		}
	}

	function updateProduct(item: ICartItem) {
		return item.quantity++
	}

	function addProduct(product: ICartItem) {
		cart.value.products.push(product)
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

	function updateCartCalculations() {
		const total = cart.value.products.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		)
		const discountedTotal = cart.value.products.reduce(
			(sum, item) => sum + item.discountedPrice * item.quantity,
			0
		)
		const totalProducts = cart.value.products.length
		const totalQuantity = cart.value.products.reduce(
			(sum, item) => sum + item.quantity,
			0
		)

		cart.value.total = total
		cart.value.discountedTotal = discountedTotal
		cart.value.totalProducts = totalProducts
		cart.value.totalQuantity = totalQuantity
	}

	async function saveCart() {
		saveToLocalStorage()
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
		() => cart.value.products,
		() => {
			updateCartCalculations()
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
