import React, {useState, useEffect} from "react"
import { fetchProductsCategory } from "./Api"

import Link from '@mui/material/Link';
import { Box } from "@mui/material";

export const RenderCategoryLinks = () => {

    const styles = { link: { textDecoration: "none", color: "black" }};

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
            <Link href={`/products/${category}`} style={ styles.link } key={category}>{category}</Link>
        )
    })

    return(
        <div>
            <Box sx={{ display: "flex", justifyContent: "space-around"}}>
                {renderLinks}
            </Box>
      </div>
    )
}