<script lang="ts" setup>
	const { cartItems } = useCart()
</script>

<template>
	<div class="cart">
		<template v-if="cartItems?.size > 0">
			<CartItem v-for="item in cartItems.values()" :key="item.id" :data="item"/>
		</template>
		<template v-else>
			<b>Корзина пуста</b>
		</template>
	</div>
</template>
