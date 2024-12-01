<script setup lang="ts">
	import { useProductStore } from '~/store/productsStore'

	const productStore = useProductStore()
	const { products, error, isLoading } = storeToRefs(productStore)
	useAsyncData('products', () => productStore.fetchProducts())
</script>

<template>
	<div v-if="isLoading">Загрузка...</div>
	<div v-else-if="error">{{ productStore.error }}</div>
	<div v-else>
		<div v-for="product in products" :key="product.id">
			<h3>{{ product.title }}</h3>
			<p>{{ product.price }} ₽</p>
		</div>
	</div>
</template>
