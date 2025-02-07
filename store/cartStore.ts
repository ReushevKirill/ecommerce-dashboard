import type { ICart, ICartItem, ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
	const isLoading = ref(false)
	const error = ref<Error | null>(null)

	const cart = ref<ICart>({
		id: 1,
		products: {} as Record<number, ICartItem>,
		total: 0,
		discountedTotal: 0,
		userId: 1,
		totalProducts: 0,
		totalQuantity: 0,
	})

	const cartItems = computed(() => cart.value?.products)

	const { getCartLS, setCartLS, parseCartLS } = useCart()

	function getExistsItemById(id: number) {
		return cart.value.products[id] ?? null
	}

	function formingNewProduct(p: ProductType): ICartItem {
		return {
			id: p.id,
			title: p.title,
			price: Math.round(p.price),
			quantity: 1,
			total: p.price,
			discountPercentage: p.discountPercentage,
			oldPrice: calcOldPrice(p.price, p.discountPercentage),
			discountAmount: calcDiscountAmount(p.price, p.discountPercentage),
			thumbnail: p.thumbnail,
			stock: p.stock,
		}
	}

	async function addToCart(p: ProductType) {
		let returnedValue = -1
		if (p.stock === 0) return returnedValue

		const existingItem = getExistsItemById(p.id)

		if (!existingItem) {
			const newProduct = formingNewProduct(p)
			addProduct(newProduct)
			returnedValue = newProduct.quantity
		} else if (existingItem?.quantity < p.stock) {
			updateProduct(existingItem)
			returnedValue = existingItem.quantity
		}

		return returnedValue
	}

	function updateProduct(item: ICartItem) {
		return item.quantity++
	}

	function addProduct(product: ICartItem) {
		cart.value.products[product.id] = product
	}

	function plusQuantity(itemId: number) {
		const item = cart.value.products[itemId]

		if (!item || item.quantity >= item.stock) return false

		cart.value.products[itemId] = {
			...item,
			quantity: item.quantity + 1,
		}

		updateCartCalculations()
	}

	function minusQuantity(itemId: number) {
		const item = cart.value.products[itemId]

		if (!item) return

		const newQuantity = item.quantity - 1

		if (newQuantity < 1) {
			removeProduct(itemId)
		} else {
			cart.value.products[itemId] = {
				...item,
				quantity: newQuantity,
			}
		}

		updateCartCalculations()
	}

	function removeProduct(id: number) {
		if (!cart.value.products[id]) return false

		// Создаём новый объект для триггера реактивности
		const newProducts = { ...cart.value.products }
		delete newProducts[id]

		cart.value.products = newProducts
		updateCartCalculations()

		return true
	}

	function restoreProducts(products: Record<string, ICartItem>) {
		return Object.fromEntries(
			Object.entries(products).map(([k, v]) => [Number(k), v]),
		) as Record<number, ICartItem>
	}

	function loadFromLocalStorage() {
		if (!getCartLS()) return null

		const parsedCart = parseCartLS()
		parsedCart.products = restoreProducts(parsedCart.products)

		return parsedCart
	}

	function saveToLocalStorage() {
		return setCartLS(
			JSON.stringify({
				...cart.value,
				products: cartItems.value,
			}),
		)
	}

	function updateCartCalculations() {
		const products = Object.values(cartItems.value)

		const total = products.reduce((s, p) => s + p.price * p.quantity, 0)
		const discountedTotal = products.reduce(
			(s, p) => s + p.discountAmount * p.quantity,
			0,
		)
		const totalProducts = products.length
		const totalQuantity = products.reduce((s, p) => s + p.quantity, 0)

		cart.value.total = Math.floor(total)
		cart.value.discountedTotal = Math.round(discountedTotal)
		cart.value.totalProducts = totalProducts
		cart.value.totalQuantity = totalQuantity
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

	function onUpdateCart() {
		updateCartCalculations()
		saveToLocalStorage()
	}

	watch(
		() => ({
			count: Object.keys(cart.value.products).length,
			ids: Object.keys(cart.value.products),
		}),
		() => {
			onUpdateCart()
		},
	)

	return {
		cart,
		isLoading,
		error,
		cartItems,
		addToCart,
		removeProduct,
		loadCart,
		minusQuantity,
		plusQuantity,
	}
})
