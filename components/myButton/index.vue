<script lang="ts" setup>
import MyLink from '@/components/myLink/index.vue';


	type Props = {
		theme?: 'primary' | 'secondary'
		to: string
	}

	const props = withDefaults(defineProps<Props>(), {
		theme: 'primary',
		to: '',
	})

	const isLink = computed(() => !!props.to)
	const renderedComponent = computed(() => (isLink.value ? MyLink : 'button'))
	const buttonClasses = computed(() => [
		'btn',
		{
			[`btn--${props.theme}`]: props.theme,
		},
	])
</script>

<template>
	<component
		:is="renderedComponent"
		:to="props.to"
		:class="[...buttonClasses, $attrs.class]"
		v-bind="$attrs"
	>
		<slot />
	</component>
</template>
