<script lang="ts" setup>
	const { cartItems } = useCart()
</script>

<template>
	<div class="cart-items">
		<template v-if="Object.values(cartItems).length > 0">
			<CartItem
				v-for="item in Object.values(cartItems)"
				:key="item.id"
				:data="item"
			/>
		</template>
		<template v-else>
			<b>Корзина пуста</b>
		</template>
	</div>
</template>
