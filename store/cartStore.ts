import type { ICart, ICartItem, ProductType } from '~/app/types/api'
import { calcDiscountProductPrice } from '~/utils/productsUtils'

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

	function formingNewProduct(p: ProductType): ICartItem {
		return {
			id: p.id,
			title: p.title,
			price: p.price,
			quantity: 1,
			total: p.price,
			discountPercentage: p.discountPercentage,
			discountedPrice: calcDiscountProductPrice(p.price, p.discountPercentage),
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
		cart.value.products.push(product)
	}

	function plusQuantity(item: ICartItem) {
		if (item.stock > item.quantity) {
			item.quantity++
		}
	}
	

	function removeProduct(id: number) {
		cart.value.products = cart.value.products.filter(i => i.id !== id)
	}

	function minusQuantity(item: ICartItem) {
		if (item.quantity > 1) {
			item.quantity--
		} else {
			removeProduct(item.id)
		}
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
		() => cart.value.products,
		() => {
			onUpdateCart()
		},
		{ deep: true }
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
		plusQuantity
	}
})
