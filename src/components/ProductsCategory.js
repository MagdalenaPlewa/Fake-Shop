import React, {useState, useEffect} from "react"
import { fetchProductsCategory } from "./Api"
import { NavLink } from "react-router-dom";

import { Box } from "@mui/material";


export const RenderCategoryLinks = () => {

    const [categories, setCategories] = useState([])


    const categoryData = () => {
        fetchProductsCategory().then(data => {
            setCategories(data)
        })
    }

    useEffect(() => {
        categoryData()
    }, [])

    const renderLinks = categories.map(category => {

        return (
            <Box key={category} sx={{m: {xs: 2}, textAlign: "left" }}>
                <NavLink to={`/products/${category}`} style={({ isActive }) => ({
                    color: isActive ? 'black' : 'gray',
                    textDecoration: "none"
                })}  key={category}>{category}</NavLink>
            </Box>
        )
    })  

    return(
        <div>
            <Box sx={{ display: {xs: "block", sm: "flex"}, justifyContent: "space-around", fontSize: {sm: "20px", md: "26px"},}}>
                {renderLinks}
            </Box>
      </div>
    )
}