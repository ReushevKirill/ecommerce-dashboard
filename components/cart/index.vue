<script lang="ts" setup>
	const { cartIsNotEmpty } = useCart()
</script>

<template>
	<div class="cart">
		<!-- !TODO <CartHeader /> -->
		<div>HEADER</div>
		<template v-if="cartIsNotEmpty">
			<CartPreview />
		</template>
		<template v-else>
			<CartGreeting />
		</template>
	</div>
</template>
