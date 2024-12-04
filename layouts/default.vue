<script lang="ts" setup>
	import { useCategoriesStore } from '~/store/categoriesStore'
import { useProductStore } from '~/store/productsStore'

	const productStore = useProductStore()
	const categoriesStore = useCategoriesStore()
	
	onMounted(() => {
		productStore.fetchAllProducts()
		categoriesStore.fetchAllCategories()
	})
</script>

<template>
	<Header />
	<div class="app__content">
		<LeftAside>
			<CatalogTree />
		</LeftAside>
		<Main>
			<slot />
		</Main>
		<RightAside>
			<CatalogTree />
		</RightAside>
	</div>
</template>
