// plugins/initCart.client.js

import { useCartStore } from '~/store/cartStore'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const cartStore = useCartStore();
    cartStore.loadFromLocalStorage()
  }
});