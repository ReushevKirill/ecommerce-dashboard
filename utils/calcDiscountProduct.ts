export const calcDiscountProduct = (
	price: number,
	discountPercentage: number
) => {
	return (price * (100 - discountPercentage)) / 100
}
