import { combineReducers } from "redux"

import { setProductsReducer, selectedProductReducer, setProductsByCategoryReducer, ratingFilterReducer, pricesFilterREducer, searchingProductsReducer, addToWishlistReducer, addToCartReducer, deleteFromWishlistReducer, clearSearchInutReducer, clearSearchInputReducer } from "./productsReducers"
import { addToWishlist } from "../actions"

const reducers = combineReducers({
    allProducts: setProductsReducer,
    selectedProduct: selectedProductReducer,
    setProductsByCategory: setProductsByCategoryReducer,
    ratingFilter: ratingFilterReducer,
    pricesFilter: pricesFilterREducer,
    searchingProducts: searchingProductsReducer,
    setWishProduct: addToWishlistReducer,
    setCart: addToCartReducer,
    clearSearchInput: clearSearchInputReducer
    // deleteWishlist: deleteFromWishlistReducer
})

export default reducers