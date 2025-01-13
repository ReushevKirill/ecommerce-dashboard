<script lang="ts" setup>
	const { cartIsNotEmpty } = useCart()
</script>

<template>
	<div class="cart">
		<CartHeader />
		<template v-if="cartIsNotEmpty">
			<CartPreview />
		</template>
		<template v-else>
			<CartGreeting />
		</template>
	</div>
</template>
