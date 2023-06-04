import { combineReducers } from "redux"

import { setProductsReducer, selectedProductReducer, setProductFilteringReducer, removeProductsReducer, clearProductsReducer } from "./productsReducers"

const reducers = combineReducers({
    allProducts: setProductsReducer,
    selectedProduct: selectedProductReducer,
    filteredProducts: setProductFilteringReducer
})

export default reducers