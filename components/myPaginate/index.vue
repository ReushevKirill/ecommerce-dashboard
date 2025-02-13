<template>
	<VueAwesomePaginate
		v-model="currentPage"
		:total-items="props.totalItems"
		:items-per-page="props.itemsPerPage"
		:max-pages-shown="props.maxPagesShown"
		:back-button-class="disabledBackButtonClasses"
		:next-button-class="disabledNextButtonClasses"
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

	const currentPage = defineModel<number>({ default: 1 })
	const props = withDefaults(defineProps<AwesomePaginationProps>(), {
		itemsPerPage: 10,
		showEndingButtons: false,
		maxPagesShown: 5,
		dir: 'ltr',
		type: 'button',
		locale: 'en',
		prevButtonContent: '<',
		nextButtonContent: '>',
		hidePrevNext: false,
		hidePrevNextWhenEnds: false,
		disablePagination: false,
		showBreakpointButtons: true,
	})

	const disabledBackButton = computed(() => {
		return currentPage.value === 1
	})

	const disabledBackButtonClasses = computed(() => {
		return `back-button ${disabledBackButton.value? 'back-button--disabled' : ''}`
	})

	const disabledNextButton = computed(() => {
		return props.totalItems <= props.itemsPerPage * currentPage.value
	})

	const disabledNextButtonClasses = computed(() => {
		return `next-button ${disabledNextButton.value? 'next-button--disabled' : ''}`
	})
</script>
