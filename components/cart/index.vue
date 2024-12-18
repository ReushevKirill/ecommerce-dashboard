<script lang="ts" setup>
	const { cartItems, removeProduct } = useCart()
</script>

<template>
	<div class="cart">
		<template v-if="cartItems?.length > 0">
			<div class="cart-item" v-for="item in cartItems" :key="item.id">
				<div class="cart-item__img">
					<img :src="item.thumbnail" :alt="item.title" />
				</div>
				<div class="cart-item__content">
					<span>{{ item.title }}</span>
					<div class="cart-item__footer">
						<button @click="removeProduct(item.id)">Удалить</button>
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
