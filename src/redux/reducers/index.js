import { combineReducers } from "redux"

import { setProductsReducer, selectedProductReducer, setProductsByCategoryReducer, ratingFilterReducer, pricesFilterREducer, searchingProductsReducer } from "./productsReducers"

const reducers = combineReducers({
    allProducts: setProductsReducer,
    selectedProduct: selectedProductReducer,
    setProductsByCategory: setProductsByCategoryReducer,
    ratingFilter: ratingFilterReducer,
    pricesFilter: pricesFilterREducer,
    searchingProducts: searchingProductsReducer
})

export default reducers