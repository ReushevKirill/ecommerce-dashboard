<script lang="ts" setup>
	import type { ProductType } from '~/app/types/api'

	const route = useRoute()
	const router = useRouter()

	const {
		api: { baseURL },
	} = useAppConfig()

	const {
		data: product,
		error,
		status,
	} = useAsyncData<ProductType>(
		`product-${route.params.id}`,
		() =>
			$fetch(`/products/${route.params.id}`, {
				baseURL: baseURL,
			}),
		{
			pick: ['images', 'title', 'description', 'price', 'reviews'],
		}
	)
</script>

<template>
	<button @click="router.back()">Назад</button>
	<div class="product">
    <img :src="product?.images[0]" alt="" />
		<h3>{{ product?.title }}</h3>
    <div>{{ product?.description }}</div>
    <div>{{ product?.price }}</div>
    <b>Reviews:</b>
    <ul>
      <li v-for="review in product?.reviews" :key="String(review.date)">
        <i>{{ review.reviewerName }}</i>
        <p>{{ review.comment }}</p>
      </li>
    </ul>
	</div>
</template>
