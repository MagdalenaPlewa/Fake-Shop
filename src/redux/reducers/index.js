import { combineReducers } from "redux"

import { setProductsReducer, selectedProductReducer, setProductsByCategoryReducer, ratingFilterReducer, pricesFilterREducer } from "./productsReducers"

const reducers = combineReducers({
    allProducts: setProductsReducer,
    selectedProduct: selectedProductReducer,
    setProductsByCategory: setProductsByCategoryReducer,
    ratingFilter: ratingFilterReducer,
    pricesFilter: pricesFilterREducer
})

export default reducers