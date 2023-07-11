import { ActionsType } from "../actions/actions-type"

const initialState = {
    products: []
}

export const setProductsReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionsType.SET_PRODUCTS:
            return {...state, products: payload}
        default:
            return state
    }
}

export const selectedProductReducer = (state = {}, {type, payload}) => {
    switch(type){
        case ActionsType.SELECTED_PRODUCT:
            return {...state, ...payload}
        default:
            return state
    }
}

export const setProductsByCategoryReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionsType.SET_PRODUCTS_BY_CATEGORY:
            return {...state, products: payload}
        default:
            return state
    }
}

export const ratingFilterReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionsType.RATING_FILTER:
            return {...state, products: payload}
        default:
            return state
    }
}

export const pricesFilterREducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionsType.PRICE_FILTER:
            return {...state, products: payload}
        default:
            return state
    }
}

export const searchingProductsReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionsType.SEARCH_PRODUCTS:
            return {...state, products: payload}
        default:
            return state
    }
}

export const addToWishlistReducer = (state = [], {type, payload}) => {
    switch(type){
        case ActionsType.ADD_TO_WISHLIST:
            const exist = state.find((x) => x.id === payload.id)
            if(exist){
                return (
                    state.map(x => x.id === payload.id ? {...x, qty: x.qty + 1} : x)
                    )
            }
            else{
                return[
                    ...state,
                    {
                        ...payload, 
                        qty: 1
                    }
                ]
            }
            break
        case ActionsType.DELETE_FROM_WISHLIST:
            const exist1 = state.find(x => x.id === payload.id)
            if(exist1.qty === 1){
                return state.filter(x => x.id !== exist1.id)
            }
            else{
                return state.map(x => x.id === payload.id ? {...x, qty: x.qty - 1} : x)
            }
            break
        default: 
            return state
            break
    }
}

export const addToCartReducer = (state = [], {type, payload}) => {
    switch(type){
        case ActionsType.ADD_TO_CART:
            const exist = state.find((x) => x.id === payload.id)
            if(exist){
                return (
                    state.map(x => x.id === payload.id ? {...x, qty: x.qty + 1} : x)
                    )
            }
            else{
                return[
                    ...state,
                    {
                        ...payload, 
                        qty: 1
                    }
                ]
            }
            break
        case ActionsType.DELETE_FROM_CART:
            const exist1 = state.find(x => x.id === payload.id)
            if(exist1.qty === 1){
                return state.filter(x => x.id !== exist1.id)
            }
            else{
                return state.map(x => x.id === payload.id ? {...x, qty: x.qty - 1} : x)
            }
            break
        default: 
            return state
            break
    }
}

export const clearSearchInputReducer = (state = [], {type, payload}) => {
    switch(type){
        case ActionsType.CLEAR_SEARCH_INPUT:
            return [...state, payload]
        default:
            return state
    }

}

// export const deleteFromWishlistReducer = (state = [], {type, payload}) => {
//     switch(type){
//         case ActionsType.DELETE_FROM_WISHLIST:
//             // const exist1 = state.find(x => x.id === payload.id)/
//             console.log(payload.id)
//             // if(exist1){
//             //     console.log(exist1)
//             //     return state.filter(x => x.id === payload.id ? {...x} : x)
//             // }
//             // if(exist1.qty === 1){
//             //     return state.filter(x => x.id !== exist1.id)
//             // }
//             // else{
//             //     return state.map(x => x.id === payload.id ? {...x, qty: x.qty - 1} : x)
//             // }
//             break
//         default: 
//             return state
//             break
//     }
// }