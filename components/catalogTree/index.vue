<script lang="ts" setup>
	const { categories, catsError, catsIsLoading, renderCatPagePath } =
		useCategories()

	const {
		routes: { home },
	} = useAppConfig()
</script>

<template>
	<div class="catalog-tree">
		<div class="catalog-tree__scroll-container">
			<Loader v-if="catsIsLoading" />
			<MyError v-else-if="catsError" :error="catsError" />
			<template v-else>
				<NuxtLink :to="home.path">
					{{ home.name }}
				</NuxtLink>
				<ul
					class="catalog-tree__list"
					v-for="category in categories"
					:key="category.slug"
				>
					<li class="catalog-tree__item">
						<NuxtLink
							class="catalog-tree__link"
							:to="renderCatPagePath(category.slug)"
						>
							<span>{{ category.name }}</span>
						</NuxtLink>
					</li>
				</ul>
			</template>
		</div>
	</div>
</template>
