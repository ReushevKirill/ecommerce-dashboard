<script lang="ts" setup>
	type Props = {
		variant?: 'primary' | 'secondary'
	}

	const props = withDefaults(defineProps<Props>(), {
		variant: 'primary',
	})

	const classes = computed(() => [
		'btn',
		{
			[`btn--${props.variant}`]: props.variant,
		},
	])
</script>

<template>
	<button :class="[classes, $attrs.class]" v-bind="$attrs">
		<slot />
	</button>
</template>
