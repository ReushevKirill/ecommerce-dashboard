<script setup lang="ts">
	import { VueAwesomePaginate } from 'vue-awesome-paginate'
	import type { fetchedProductsType } from '~/app/types/api'

	const limitProducts = ref(10)
	const maxPagesShown = ref(5)
	const currentPage = ref(1)
	const skip = computed(() => {
		return (currentPage.value - 1) * limitProducts.value
	})

	const { data, status, error } = useCustomFetch<fetchedProductsType>(
		'/products',
		{
			method: 'GET',
			watch: [currentPage],
			params: {
				limit: limitProducts.value,
				skip: skip.value,
			},
		},
	)

	const onClickHandler = (page: number) => {
		currentPage.value = page
	}

	watch(data, (oldData, newData) => {
		console.log(oldData)
		console.log(newData)
	})
</script>

<template>
	<Loader v-if="status === 'pending'" />
	<MyError v-else-if="error" :error="error" />
	<div v-else-if="status === 'success'">
		<ProductsList :items="data?.products!" />
		<VueAwesomePaginate
			v-model="currentPage"
			:total-items="data?.total"
			:items-per-page="limitProducts"
			:max-pages-shown="maxPagesShown"
			@click="onClickHandler"
		/>
	</div>
</template>

<style>
	.pagination-container {
		margin-top: 24px;
		display: flex;
		column-gap: 10px;
	}

	.paginate-buttons {
		height: 40px;
		width: 40px;
		border-radius: 20px;
		cursor: pointer;
		background-color: rgb(242, 242, 242);
		border: 1px solid rgb(217, 217, 217);
		color: black;
	}

	.paginate-buttons:hover {
		background-color: #d8d8d8;
	}

	.active-page {
		background-color: #3498db;
		border: 1px solid #3498db;
		color: white;
	}

	.active-page:hover {
		background-color: #2988c8;
	}
</style>
