// plugins/initCart.client.js

import { useCartStore } from '~/store/cartStore'

export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    const cartStore = useCartStore();
    await cartStore.loadCart()
  }
});