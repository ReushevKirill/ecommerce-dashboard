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

	const { addToCart } = useCart()

	const isAddedToCart = ref(false)
	const isNotStock = ref(false)

	async function addHandler(data: ProductType) {
		const value = await addToCart(data)

		if (value === -1) {
			isNotStock.value = true
		} else if (value) {
			
		} 
	}
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
				<button @click.prevent="addToCart(data)">Добавить в корзину</button>
			</div>
		</NuxtLink>
	</li>
</template>
