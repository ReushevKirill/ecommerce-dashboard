<script lang="ts" setup>
	const { cart } = useCart()
</script>

<template>
	<div class="order-price" v-show="cart.total > 0">
		<Text type="p3semibold" class="order-price__title">
      Итого
    </Text>
		<Text type="bold" class="order-price__price">
      {{ formatPrice(cart.total) }}
    </Text>
	</div>
</template>
