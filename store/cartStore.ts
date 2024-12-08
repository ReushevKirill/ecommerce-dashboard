import type { ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<ProductType[]>([])
  const CART_KEY_LS: string = 'cart'

  const {setItem, getItem, parseByKey} = useLocalStorage()

  function addToCartStore(product: ProductType) {
    cartItems.value.push(product)
  }

  function addToLocalStorage(product: ProductType) {
    if (!getItem(CART_KEY_LS)) {
      return setItem(CART_KEY_LS, JSON.stringify([product]))
    } else {
      return setItem(CART_KEY_LS, JSON.stringify([...parseByKey(CART_KEY_LS), product]))
    }
  }

  function deleteFromCartStoreById(id: number) {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }

  function deleteFromLocalStorage(id: number) {
    // 
  }

  return { cartItems, addToCartStore, deleteFromCartStoreById }
});