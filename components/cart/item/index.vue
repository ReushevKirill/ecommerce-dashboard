<script lang="ts" setup>
	import type { ICartItem } from '~/app/types/api'

	const { removeProduct } = useCart()

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
	<div class="cart-item" :key="data.id">
		<div class="cart-item__img">
			<NuxtImg
				width="83"
				height="83"
				:src="data.thumbnail"
				:alt="data.title"
				loading="lazy" />
		</div>
		<div class="cart-item__content">
			<span class="cart-item__title">
				{{ data.title }}
			</span>
			<div class="cart-item__footer">
				<CartItemCounter :data="data" />
				<span class="cart-item__price">
					{{ formatPrice(data.price) }}
				</span>
			</div>
		</div>
		<Icon
			name="mdi:close"
			class="cart-item__remove"
			@click="removeProduct(data.id)" />
	</div>
</template>
