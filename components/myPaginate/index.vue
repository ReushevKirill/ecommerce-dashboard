<template>
	<VueAwesomePaginate
		v-model="currentPage!"
		:total-items="props.totalItems"
		:items-per-page="props.itemsPerPage"
		:max-pages-shown="props.maxPagesShown"
	>
		<template #prev-button>
			<Icon name="mdi:chevron-left" />
		</template>

		<template #next-button>
			<Icon name="mdi:chevron-right" />
		</template>
	</VueAwesomePaginate>
</template>

<script lang="ts" setup>
	import { VueAwesomePaginate } from 'vue-awesome-paginate'
	import type { AwesomePaginationProps } from '~/app/types/common'

	const currentPage = defineModel<number>('currentPage')
	const props = defineProps<AwesomePaginationProps>()
</script>
