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

export const setProductsFiltering = (products) => {
    return{
        type: ActionsType.FILTERED_PRODUCTS,
        payload: products
    }
}