//first letter capitalize
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

//get product discount price
export const getDiscountPrice = (price, discount) => {
    return discount && discount > 0 && price - price * (discount / 100)
}

//get products cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
    let productInCart = cartItems.filter(
        (single) =>
            single.id === product.id &&
            (single.selectedProductColor ? single.selectedProductColor === color : true) &&
            (single.selectedProductSize ? single.selectedProductSize === size : true)
    )[0]
    if (cartItems.length >= 1 && productInCart) {
        if (product.variation) {
            return cartItems.filter(
                (single) =>
                    single.id === product.id &&
                    single.selectedProductColor === color &&
                    single.selectedProductSize === size
            )[0].quantity
        } else {
            return cartItems.filter((single) => product.id === single.id)[0].quantity
        }
    } else {
        return 0
    }
}

export const checkAvaiableQuantityToAdd = (arr, product) => {
    const productsInCart = arr.filter((item) => item.id === product.id)
    if (productsInCart && productsInCart.length > 0) {
        const totalProductQuantityInCart =
            productsInCart.length > 0 &&
            productsInCart.reduce((total, item) => total + item.cartQuantity, 0)
        let avaiable = product.quantity - totalProductQuantityInCart
        return avaiable < 1 ? 0 : avaiable
    } else {
        product.quantity
    }
}
