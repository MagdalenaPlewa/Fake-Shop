import React, {useState, useEffect} from "react"
import { fetchProductsCategory } from "./Api"

import Link from '@mui/material/Link';
import { Box } from "@mui/material";

export const RenderCategoryLinks = () => {

    const styles = { 
        link:
        {
            textDecoration: "none", 
            color: "black" ,
        },

    };

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
                <Link href={`/products/${category}`} style={ styles.link } key={category}>{category}</Link>
            </Box>
        )
    })

    return(
        <div>
            <Box sx={{ display: {xs: "block", sm: "flex"}, justifyContent: "space-around"}}>
                {renderLinks}
            </Box>
      </div>
    )
}