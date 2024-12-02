<script setup lang="ts">
	import { useProductStore } from '~/store/productsStore'

	const productStore = useProductStore()
	const {
		data: products,
		status,
		error,
	} = useAsyncData('products', () => productStore.fetchProducts())
</script>

<template>
	<div v-if="status === 'pending'">Загрузка...</div>
	<div v-else-if="error">{{ error }}</div>
	<div v-else>
		<div v-for="product in products" :key="product.id">
			<h3>{{ product.title }}</h3>
			<p>{{ product.price }} ₽</p>
		</div>
	</div>
</template>
