import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/actions"
import { fetchProductsData } from "./Api";
import { ProductCardRender } from "./ProductCardRender";

import { Box } from "@mui/material";


const ProductListing = ({handleAddProduct}) => {

    // const products = useSelector(state => state.allProducts.products)
    const dispatch = useDispatch()

    const LOCAL_STORAGE_KEY = "productList"

    const getLocalStorage = () => {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY)
      if(data) return JSON.parse(data)
      else return []
    }

    const [productList, setProductList] = useState(getLocalStorage())

    const productsData = () => {
        fetchProductsData().then(data => {
            dispatch(setProducts(data))
            setProductList(data)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
        })
    }

    useEffect(() => {
        productsData()
    }, [])

    const renderList = productList.length ? (productList.map(product => {
            const {id, title, image, price, rating} = product

            return(
                <div key={id}>
                  <ProductCardRender 
                  product={product}
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating.rate}
                  handleAddProduct={handleAddProduct}
                  />
                </div>
            )
        })) : (<>Loading...</>)
    return(
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", p: 2, m: 2}} >
            {renderList}
        </Box>
    )
}

export default ProductListing