<script lang="ts" setup>
	import type { ProductType } from '~/app/types/api'

	const props = withDefaults(
		defineProps<{
			items: ProductType[]
		}>(),
		{
			items: () => [] as ProductType[],
		},
	)
</script>
<template>
	<ul class="products__list" v-if="items.length > 0">
		<ProductsItem v-for="data in items" :key="data.id" :data="data" />
	</ul>
	<div v-else>Нет товаров.</div>
</template>
