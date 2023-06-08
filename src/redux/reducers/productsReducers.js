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