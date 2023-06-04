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

export const setProductFilteringReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionsType.FILTERED_PRODUCTS:
            return {...state, products: payload}
        // case ActionsType.CLEAR_PRODUCTS:
        //     return {}
        default:
            return state
    }
}