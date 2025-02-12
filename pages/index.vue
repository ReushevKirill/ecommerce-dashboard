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
				<VueAwesomePaginate
					v-model="currentPage"
					:total-items="data?.total!"
					:items-per-page="limit"
					:max-pages-shown="maxPagesShown"
				>
					<template #prev-button>
						<Icon name="mdi:chevron-left" />
					</template>

					<template #next-button>
						<Icon name="mdi:chevron-right" />
					</template>
				</VueAwesomePaginate>
			</div>
		</template>
	</MySection>
</template>
