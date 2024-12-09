<script lang="ts" setup></script>

<template>
	<Aside class="aside-right">
		<ClientOnly fallback="Loading cart...">
			<Cart class="aside__content"/>
		</ClientOnly>
	</Aside>
</template>
