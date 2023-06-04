import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/actions"
import { fetchProductsData } from "./Api";
import { ProductCardRender } from "./ProductCardRender";

import { Box } from "@mui/material";

const ProductListing = () => {
    const products = useSelector(state => state.allProducts.products)
    const dispatch = useDispatch()

    const productsData = () => {
        fetchProductsData().then(data => {
            dispatch(setProducts(data))
        })
    }

    useEffect(() => {
        productsData()
    }, [])

    const renderList = products.map(product => {
            const {id, title, image, price} = product

            return(
                <div key={id}>
                  <ProductCardRender 
                  id={id}
                  title={title}
                  image={image}
                  price={price}/>
                </div>
            )
        })
    return(
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", p: 2, m: 2}} >
            {renderList}
        </Box>
    )
}

export default ProductListing