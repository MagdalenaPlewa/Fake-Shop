import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchFilteredProducts } from "./Api"
import { setProductsFiltering, clearProducts } from "../redux/actions"
// import { clearProducts } from "../redux/actions"
import { ProductCardRender } from "./ProductCardRender"
import FiltersPanel from "./FiltersPanel"

import { Grid } from "@mui/material";

export const ProductsFiltering = ({}) => {

    const products = useSelector(state => state.filteredProducts.products)

    const {category} = useParams()
    const dispatch = useDispatch()
    const [rating, setRating] = useState("0");





    const categoryData = () => {
        fetchFilteredProducts(category).then(data => {
            dispatch(setProductsFiltering(data))
        })
    }

    useEffect(() => {
        categoryData()
    }, [])

    useEffect(() => {
        fetchFilteredProducts(category).then(data => {
          const filter = data.filter(product => product.rating.rate > rating)
          dispatch(setProductsFiltering(filter))
      })
    }, [rating])

    const renderList = products.map(product => {
        const {id, title, image, price, rating} = product

        return(
            <div key={id}>
                <ProductCardRender 
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating.rate}/>
            </div>
        )
    })

    return(
        <Grid container>
        <Grid item xs={12} md={2}>
          <FiltersPanel
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", p: 1}}>
         {renderList}
        </Grid>
      </Grid>
    )
}