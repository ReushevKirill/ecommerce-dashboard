<script lang="ts" setup>
	import type { ICartItem } from '~/app/types/api';

	const props = withDefaults(
		defineProps<{
			data: ICartItem
		}>(),
		{
			data: () => ({} as ICartItem),
		}
	)

	const { data } = toRefs(props)

	const { removeProduct, oldPrice, price } = useCart(data)
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
				<div class="cart-item__prices">
					<Text
						type="p1semibold"
						class="cart-item__old-price"
						v-if="data.discountPercentage > 10">
						{{ oldPrice }}
					</Text>
					<Text type="p1semibold" class="cart-item__price">
						{{ formatPrice(price) }}
					</Text>
				</div>
			</div>
		</div>
		<Icon
			name="mdi:close"
			class="cart-item__remove"
			@click="removeProduct(data.id)" />
	</div>
</template>
