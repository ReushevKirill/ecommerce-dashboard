<script lang="ts" setup>
	import type { ProductType } from '~/app/types/api'

	const route = useRoute()
	const { addToCartStore } = useCart()

	const {
		api: { baseURL },
	} = useAppConfig()

	const {
		data: cat,
		status,
		error,
	} = await useAsyncData<{ products: ProductType[] }>(
		`category-${route.params.slug}`,
		() =>
			$fetch(`/products/category/${route.params.slug}`, {
				baseURL: baseURL,
			})
	)
</script>

<template>
	<NuxtLink to="/">to home</NuxtLink>
	<div class="products">
		<ul class="products__list">
			<li
				class="products__item"
				v-for="product in cat?.products"
				:key="product.id">
				<NuxtLink :to="`/product/${product.id}`">
					<div class="products__image">
						<img :src="product.images[0]" :alt="product.title" />
					</div>
					<h3 class="products__title">{{ product.title }}</h3>
					<span class="products__price">{{ product.price }} $</span>
					<div>
						<button @click.prevent="addToCartStore(product)">Добавить в корзину</button>
					</div>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
