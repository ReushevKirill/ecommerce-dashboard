<script lang="ts" setup>
	import { useCategoriesStore } from '~/store/categoriesStore'
	import { useProductStore } from '~/store/productsStore'

	const productStore = useProductStore()
	const categoriesStore = useCategoriesStore()

	onMounted(() => {
		categoriesStore.fetchAllCategories()
	})
</script>

<template>
	<Header />
	<div class="app__content">
		<LeftAside />
		<Main>
			<slot />
		</Main>
		<RightAside />
	</div>
</template>
