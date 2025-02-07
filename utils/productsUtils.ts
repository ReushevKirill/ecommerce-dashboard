export function calcTotalProductPrice(quantity: number, price: number) {
	return Math.floor(price * quantity)
}

export function formatPrice(price: number) {
	return `${Math.round(price)} $`
}

export function calcDiscountPrice(price: number, discountPercentage: number) {
	return Math.round((price * (100 - Math.round(discountPercentage))) / 100)
}

export function calcOldPrice(price: number, discountPercentage: number) {
	return Math.round(price + (price * Math.round(discountPercentage)) / 100)
}

export function calcDiscountAmount(price: number, discountPercentage: number) {
	return Math.round((price * Math.round(discountPercentage)) / 100)
}
