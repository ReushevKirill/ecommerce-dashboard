<script lang="ts" setup>
	import { useCategoriesStore } from '~/store/categoriesStore'

	const categoriesStore = useCategoriesStore()
	const { categories, error, isLoading } = storeToRefs(categoriesStore)
</script>

<template>
	<div class="catalog-tree">
		<div class="catalog-tree__scroll-container">
			<div v-if="isLoading">Loading...</div>
			<div v-else-if="error">{{ error }}</div>
			<div v-else>
				<div v-for="category in categories" :key="category.id">
					<h3>{{ category.slug }}</h3>
					<p>{{ category.name }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
