import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/actions"
import { fetchProductsData } from "./Api";
import { ProductCardRender } from "./ProductCardRender";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Rating } from "@mui/material";

import { Box } from "@mui/material";
import { useState } from "react";

const ProductListing = ({handleAddProduct}) => {

    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    let componentMounted = true

    // useEffect(() => {
    //     const getProducts = async() => {
    //         setLoading(true)
    //         const response = await fetch('https://fakestoreapi.com/products')
    //         if(componentMounted){
    //             setData(await response.clone().json())
    //             setFilter(await response.json())
    //             console.log(data)
    //             dispatch(setProducts(data))
    //             setLoading(false)
    //         }
    //         return() => {
    //             componentMounted = false
    //         }
    //     }
    //     getProducts()
    // }, [])

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

    const renderList = products.length ? (products.map(product => {
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