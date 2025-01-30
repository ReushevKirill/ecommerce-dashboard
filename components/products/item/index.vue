<script lang="ts" setup>
	import type { ProductType } from '~/app/types/api';

	const props = withDefaults(
		defineProps<{
			data: ProductType
		}>(),
		{
			data: () => ({} as ProductType),
		}
	)

	const { minusQuantity, plusQuantity, cartItems, addToCart } = useCart()
	const { oldPrice } = useProduct(props.data)

	const cartItem = computed(() => cartItems.value[props.data.id] ?? null)
	const isHideOldPrice = computed(
		() => !cartItem.value && Math.round(props.data.discountPercentage) > 10
	)
	const isNotAvailableForAdding = computed(
		() => cartItem.value?.quantity === props.data.stock
	)

	function plusHandler() {
		return cartItem.value
			? plusQuantity(cartItem.value.id)
			: addToCart(props.data)
	}
</script>
<template>
	<li class="products__list-item">
		<NuxtLink :to="`/product/${data.id}`" class="products__item">
			<div class="products__image">
				<img :src="data.images[0]" :alt="data.title" />
				<div :class="['products__overlay', { show: cartItem }]">
					<div v-if="cartItem" class="products__overlay-wrapper">
						<div class="products__overlay-count">{{ cartItem.quantity }}</div>
						<div
							class="products__overlay-text"
							v-show="isNotAvailableForAdding">
							Not anymore
						</div>
					</div>
				</div>
			</div>
			<h3 class="products__title">
				{{ data.title }}
			</h3>
			<div class="products__footer">
				<div
					:class="['products__btn', { active: cartItem }]"
					@click.prevent="() => {}">
					<Icon
						name="mdi:minus"
						@click.prevent="minusQuantity(cartItem.id)"
						class="products__btn-action"
						v-if="cartItem" />
					<span class="products__old-price" v-if="isHideOldPrice">
						{{ oldPrice }}
					</span>
					<span class="products__price">
						{{ formatPrice(data.price) }}
					</span>
					<Icon
						name="mdi:plus"
						@click.prevent="plusHandler"
						:class="[
							'products__btn-action',
							{ disabled: isNotAvailableForAdding },
						]" />
				</div>
			</div>
		</NuxtLink>
	</li>
</template>
