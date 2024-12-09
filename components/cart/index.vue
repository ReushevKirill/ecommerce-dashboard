<script lang="ts" setup>
	const { cartItems, deleteFromCart } = useCart()
</script>

<template>
		<div class="cart">
			<template v-if="cartItems?.length > 0">
				<div class="product-item" v-for="item in cartItems" :key="item.id">
					<div class="product-item__img">
						<!-- <img :src="item.thumbnail" :alt="item.title" /> -->
					</div>
					<div class="product-item__content">
						<span>{{ item.title }}</span>
						<div class="product-item__footer">
							<button @click="deleteFromCart(item.id)">Удалить</button>
							<span>{{ item.price }}</span>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<b>Корзина пуста</b>
			</template>
		</div>
</template>
