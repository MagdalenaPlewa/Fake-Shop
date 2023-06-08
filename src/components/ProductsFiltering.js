import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByCategory } from "./Api"
import { setProductsByCategory, clearProducts, ratingFilter, priceFilter } from "../redux/actions"
// import { clearProducts } from "../redux/actions"
import { ProductCardRender } from "./ProductCardRender"
import FiltersPanel from "./FiltersPanel"

import { Grid } from "@mui/material";

export const ProductsFiltering = ({}) => {

    const products = useSelector(state => state.setProductsByCategory.products)
    // const productsByRating = useSelector(state => state.rankingFilter.products)

    const {category} = useParams()
    const dispatch = useDispatch()

    const [productsToRender, setProductsToRender] = useState([])
    const [prices, setPrices] = useState([])
    const [priceRange, setPriceRange] = useState([]);
    const [rating, setRating] = useState("0");

    const getPrices = () => {
      const priceArr = []
          products.map(product => {
            priceArr.push(product.price)
            return (
              setPrices([Math.min(...priceArr), Math.max(...priceArr)])

            )
          } 
        )
   }
    console.log(prices[1], priceRange)

    useEffect(() => {
      fetchProductsByCategory(category).then(data => {
        dispatch(setProductsByCategory(data))
        setProductsToRender(data)
      })
    }, [])

    useEffect(() => {
     getPrices()
     setPriceRange(prices)
  }, [products])

    useEffect(() => {
          const productsByRating = products.filter(product => product.rating.rate > rating)
          setProductsToRender(productsByRating)
          dispatch(ratingFilter(productsByRating))
    }, [rating])

    useEffect(() => {
      const productsByPrices = products.filter(product => {
        return(product.price >= priceRange[0] && product.price <= priceRange[1])
      })

        setProductsToRender(productsByPrices)
        dispatch(priceFilter(productsByPrices))

}, [priceRange])

    const renderList = productsToRender.map(product => {
        const {id, title, image, price, rating} = product
        return(
            <div key={id}>
              <ProductCardRender
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating.rate}
                  />
            </div>
        )
    })

    return(
        <Grid container>
        <Grid item xs={12} md={2}>
          <FiltersPanel
            rating={rating}
            setRating={setRating}
            prices={prices}
            setPrices={setPrices}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", p: 1}}>
         {renderList}
        </Grid>
      </Grid>
    )
}