<script lang="ts" setup>
	const props = withDefaults(
		defineProps<{
			error: Error | any
		}>(),
		{
			error: null,
		},
	)
</script>

<template>
	<div class="error">
		<template v-if="props.error.message">
			{{ props.error.message }}
		</template>
		<template v-else>
			{{ props.error }}
		</template>
	</div>
</template>
