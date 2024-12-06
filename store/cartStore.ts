import type { ProductType } from '~/app/types/api'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<ProductType[]>([])

  function addToCartStore(product: ProductType) {
    cartItems.value.push(product)
  }

  function addToLocalStorage(product: ProductType) {
    // 
  }

  function deleteFromCartStoreById(id: number) {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }

  function deleteFromLocalStorage(id: number) {
    // 
  }

  return { cartItems, addToCartStore, deleteFromCartStoreById }
});