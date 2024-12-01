<template>
	<Header />
	<div class="app__content">
		<aside>left aside</aside>
		<v-main>
			<slot />
		</v-main>
		<aside>right aside</aside>
	</div>
	<Footer />
</template>

<script lang="ts" setup></script>
