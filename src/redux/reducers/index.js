import { combineReducers } from "redux"

import { setProductsReducer, selectedProductReducer, setProductsByCategoryReducer, searchingProductsReducer, addToWishlistReducer, addToCartReducer, addToLocalstorageReducer} from "./productsReducers"

const reducers = combineReducers({
    allProducts: setProductsReducer,
    selectedProduct: selectedProductReducer,
    setProductsByCategory: setProductsByCategoryReducer,
    searchingProducts: searchingProductsReducer,
    setWishProduct: addToWishlistReducer,
    setCart: addToCartReducer,
})

export default reducers