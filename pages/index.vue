<script setup lang="ts">
	import { useProductStore } from '~/store/productsStore'

	const productStore = useProductStore()
	const { products, isLoading, error } = storeToRefs(productStore)
</script>

<template>
	<Loader v-if="isLoading"/>
	<MyError v-else-if="error" :error="error" />
	<div v-else>
		<div v-for="product in products" :key="product.id">
			<h3>{{ product.title }}</h3>
			<p>{{ product.price }} $</p>
		</div>
	</div>
</template>
