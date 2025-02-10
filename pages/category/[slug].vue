<script lang="ts" setup>
	import type { ProductType } from '~/app/types/api'

	const {
		routes: { home },
	} = useAppConfig()
	const route = useRoute()

	const {
		api: { baseURL },
	} = useAppConfig()

	const { data: cat, status } = await useAsyncData<{ products: ProductType[] }>(
		`category-${route.params.slug}`,
		() =>
			$fetch(`/products/category/${route.params.slug}`, {
				baseURL: baseURL,
			}),
	)
</script>

<template>
	<template v-if="status === 'success' && cat">
		<NuxtLink :to="home.path">to home</NuxtLink>
		<ClientOnly>
			<ProductsList :items="cat.products" />
		</ClientOnly>
	</template>
	<template v-else>
		<Loader />
	</template>
</template>
