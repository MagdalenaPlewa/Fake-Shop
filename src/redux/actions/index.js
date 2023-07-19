import { ActionsType } from "./actions-type";

export const setProducts = (products) => {
    return{
        type: ActionsType.SET_PRODUCTS,
        payload: products
    }
}

export const selectedProduct = (product) => {
    return{
        type: ActionsType.SELECTED_PRODUCT,
        payload: product
    }
}

// export const clearProducts = () => {
//     return{
//         type: ActionsType.CLEAR_PRODUCTS,
//     }
// }

export const setProductsByCategory = (products) => {
    return{
        type: ActionsType.SET_PRODUCTS_BY_CATEGORY,
        payload: products
    }
}

export const searchProducts = (searchingProducts) => {
    return{
        type: ActionsType.SEARCH_PRODUCTS,
        payload: searchingProducts
    }
}

export const addToWishlist = (product) => {
    return{
        type: ActionsType.ADD_TO_WISHLIST,
        payload: product
    }
}

export const deleteFromWishlist = (product) => {
    return{
        type: ActionsType.DELETE_FROM_WISHLIST,
        payload: product,
    }
}

export const addToCart = (product) => {
    return{
        type: ActionsType.ADD_TO_CART,
        payload: product
    }
}

export const deleteFromCart = (product) => {
    return{
        type: ActionsType.DELETE_FROM_CART,
        payload: product,
    }
}

export const removeItemFromCart = (product) => {
    return{
        type: ActionsType.REMOVE_PRODUCT_FROM_CART,
        payload: product,
    }
}
