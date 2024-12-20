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

	const { addToCart, cartItems, minusQuantity, plusQuantity } = useCart()

	const cartItem = computed(() => cartItems.value.find(i => i.id === props.data.id))
</script>
<template>
	<li class="products__item">
		<NuxtLink :to="`/product/${data.id}`">
			<div class="products__image">
				<img :src="data.images[0]" :alt="data.title" />
			</div>
			<h3 class="products__title">{{ data.title }}</h3>
			<span class="products__price">{{ data.price }} $</span>
			<div>
				<template v-if="cartItem">	
					<div>
						<button @click.prevent="minusQuantity(cartItem)">-</button>
						<div>{{ cartItem?.quantity }}</div>
						<button @click.prevent="plusQuantity(cartItem)">+</button>
					</div>
				</template>
				<template v-else>	
					<button @click.prevent="addToCart(data)">add to cart</button>
				</template>
			</div>
		</NuxtLink>
	</li>
</template>
