<template>
	<Header />
	<div class="app__content">
		<LeftAside />
		<main class="main">
			<slot />
		</main>
		<RightAside />
	</div>
	<Footer />
</template>

<script lang="ts" setup></script>
