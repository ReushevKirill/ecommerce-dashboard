<script lang="ts" setup>
	const {
		routes: { home },
	} = useAppConfig()
</script>

<template>
	<div class="logo">
		<NuxtLink :to="home.path">foodo</NuxtLink>
	</div>
</template>
