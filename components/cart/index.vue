<script lang="ts" setup>
	const { cartItems, minusQuantity, plusQuantity } = useCart()
</script>

<template>
	<div class="cart">
		<template v-if="cartItems?.size > 0">
			<div class="cart-item" v-for="item in cartItems.values()" :key="item.id">
				<div class="cart-item__img">
					<img :src="item.thumbnail" :alt="item.title" />
				</div>
				<div class="cart-item__content">
					<span>{{ item.title }}</span>
					<div class="cart-item__footer">
						<div class="cart-item__counter">
							<div class="cart-item__counter-btn" @click="minusQuantity(item)">-</div>
							<div class="cart-item__counter-count">{{ item.quantity }}</div>
							<div class="cart-item__counter-btn" @click="plusQuantity(item)">+</div>
						</div>
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
