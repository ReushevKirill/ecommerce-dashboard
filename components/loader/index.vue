<script lang="ts" setup>
	const props = withDefaults(
		defineProps<{
			width?: string
		}>(),
		{
			width: '2em',
		},
	)
</script>

<template>
	<svg class="loader" viewBox="25 25 50 50" :width="props.width">
		<circle cx="50" cy="50" r="20"></circle>
	</svg>
</template>
