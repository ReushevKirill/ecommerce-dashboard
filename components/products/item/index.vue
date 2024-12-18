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

	const { addToCart, removeProduct } = useCart()

	const isAddedToCart = ref(false)
	const isNotStock = ref(false)
	const addedCount = ref(0)

	async function addHandler(data: ProductType) {
		const value = await addToCart(data)

		if (value === -1) {
			return isNotStock.value = true
		} else {
			addedCount.value = value
			isAddedToCart.value = true
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
				<template v-if="!isAddedToCart">	
					<button @click.prevent="addHandler(data)">add to cart</button>
				</template>
				<template v-else>	
					<div>
						<button @click.prevent="removeProduct(data.id)">-</button>
						<div>{{ addedCount }}</div>
						<button @click.prevent="addHandler(data)">+</button>
					</div>
				</template>
			</div>
		</NuxtLink>
	</li>
</template>
