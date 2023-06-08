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

export const ratingFilter = (productsByRating) => {
    return{
        type: ActionsType.RATING_FILTER,
        payload: productsByRating
    }
}

export const priceFilter = (productsByPrices) => {
    return{
        type: ActionsType.PRICE_FILTER,
        payload: productsByPrices
    }
}