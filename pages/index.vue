<script setup lang="ts">
	import type { fetchedProductsType } from '~/app/types/api'

	const { skipped, currentPage, limit, maxPagesShown } = usePagination({
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
	<MySection class="home">
		<template v-if="status === 'pending'">
			<Loader />
		</template>
		<template v-else-if="error">
			<MyError :error="error" />
		</template>
		<template v-else-if="status === 'success'">
			<div class="home-products">
				<ProductsList :items="data?.products!" />
				<MyPaginate
					v-model="currentPage"
					:total-items="data?.total!"
					:items-per-page="limit"
					:max-pages-shown="maxPagesShown"
				/>
			</div>
		</template>
	</MySection>
</template>
