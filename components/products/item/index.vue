<script lang="ts" setup>
	import type { ProductType } from '~/app/types/api'

	const props = withDefaults(
		defineProps<{
			data: ProductType
		}>(),
		{
			data: () => ({} as ProductType),
		}
	)

	const { minusQuantity, plusQuantity, cartItems, addToCart } = useCart()
	const cartItem = computed(() => cartItems.value.get(props.data.id) ?? null)

	function plusHandler() {
		return cartItem.value ? plusQuantity(cartItem.value) : addToCart(props.data)
	}
</script>
<template>
	<li class="products__list-item">
		<NuxtLink :to="`/product/${data.id}`" class="products__item">
			<div class="products__image">
				<img :src="data.images[0]" :alt="data.title" />
				<div :class="['products__overlay', { show: cartItem }]">
					{{ cartItem ? cartItem.quantity : '' }}
				</div>
			</div>
			<h3 class="products__title">
				{{ data.title }}
			</h3>
			<div class="products__footer">
				<div :class="['products__btn', { active: cartItem }]">
					<Icon
						name="mdi:minus"
						@click.prevent="minusQuantity(cartItem)"
						class="products__btn-action"
						v-if="cartItem" />
					<span class="products__price">
						{{ formatPrice(data.price) }}
					</span>
					<Icon
						name="mdi:plus"
						@click.prevent="plusHandler"
						class="products__btn-action" />
				</div>
			</div>
		</NuxtLink>
	</li>
</template>
