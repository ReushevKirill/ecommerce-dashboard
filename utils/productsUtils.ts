export function calcDiscountProductPrice(
	price: number,
	discountPercentage: number
) {
	return Math.floor((price * (100 - discountPercentage)) / 100)
}

export function calcTotalProductPrice(quantity: number, price: number) {
	return Math.floor(price * quantity)
}
