<script lang="ts" setup>
	import type { ICartItem } from '~/app/types/api'
	const { minusQuantity, plusQuantity } = useCart()

	const props = withDefaults(
		defineProps<{
			data: ICartItem
		}>(),
		{
			data: () => ({} as ICartItem),
		}
	)
</script>

<template>
	<div class="cart-item__counter">
		<Icon
			name="mdi:minus"
			class="cart-item__counter-action"
			@click="minusQuantity(data)" />
		<div class="cart-item__counter-count">
      {{ data.quantity }}
    </div>
		<Icon
			name="mdi:plus"
			class="cart-item__counter-action"
			@click="plusQuantity(data)" />
	</div>
</template>
