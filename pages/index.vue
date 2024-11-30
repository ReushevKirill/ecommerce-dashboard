<template>
	<div>App</div>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
	const { data, status, error } = useAsyncData('products', () => fetchFromAPI('products'))
</script>
