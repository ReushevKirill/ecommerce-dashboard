<script setup lang="ts">
	import { VueAwesomePaginate } from 'vue-awesome-paginate'
	import type { fetchedProductsType } from '~/app/types/api'

	const maxPagesShown = ref(5)

	const { skipped, currentPage, limit } = usePagination({
		initialPage: 1,
		limit: 10,
	})

	const { data, status, error } = useCustomFetch<fetchedProductsType>(
		() => `/products?limit=${limit.value}&skip=${skipped.value}`,
		{
			method: 'GET',
			watch: [currentPage],
		},
	)
</script>

<template>
	<Loader v-if="status === 'pending'" />
	<MyError v-else-if="error" :error="error" />
	<div v-else-if="status === 'success'">
		<ProductsList :items="data?.products!" />
		<VueAwesomePaginate
			v-model="currentPage"
			:total-items="data?.total!"
			:items-per-page="limit"
			:max-pages-shown="maxPagesShown"
		/>
	</div>
</template>
