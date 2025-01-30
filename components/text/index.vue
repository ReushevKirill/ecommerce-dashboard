<script lang="ts" setup>
	type Props = {
		type?: 'p1semibold' | 'p3semibold' | 'bold'
	}

	const props = withDefaults(defineProps<Props>(), {})

	const classes = computed(() => {
		return ['text', { [`text--${props.type}`]: props.type }]
	})
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
