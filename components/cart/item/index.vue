<script lang="ts" setup>
	import type { ICartItem } from '~/app/types/api'

	const { minusQuantity, plusQuantity, removeProduct } = useCart()

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
			<span class="cart-item__title">{{ data.title }}</span>
			<div class="cart-item__footer">
				<div class="cart-item__counter">
					<div class="cart-item__counter-btn" @click="minusQuantity(data)">
						-
					</div>
					<div class="cart-item__counter-count">{{ data.quantity }}</div>
					<div class="cart-item__counter-btn" @click="plusQuantity(data)">
						+
					</div>
					<button @click="removeProduct(data.id)">delete</button>
				</div>
				<span>{{ data.price }}</span>
			</div>
		</div>
	</div>
</template>
