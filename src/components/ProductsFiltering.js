import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByCategory } from "./Api"
import { setProductsByCategory, clearProducts, ratingFilter, priceFilter } from "../redux/actions"
// import { clearProducts } from "../redux/actions"
import { ProductCardRender } from "./ProductCardRender"
import FiltersPanel from "./FiltersPanel"

import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from '@mui/icons-material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';

import { Grid, Box } from "@mui/material";

export const ProductsFiltering = ({handleAddProduct}) => {

    const products = useSelector(state => state.setProductsByCategory.products)
    // const productsByRating = useSelector(state => state.rankingFilter.products)

    const {category} = useParams()
    const dispatch = useDispatch()

    const [productsToRender, setProductsToRender] = useState([])
    const [productsByPrices, setProductsByPrices] = useState([])
    const [productsByRating, setProductsByRiting] = useState([])
    const [prices, setPrices] = useState([])
    const [priceRange, setPriceRange] = useState([]);
    const [rating, setRating] = useState("0");
    const [isActive, setIsActive] = useState(false)

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

   const handleClick = () => {
    setIsActive(current => !current)
   }

    useEffect(() => {
      fetchProductsByCategory(category).then(data => {
        dispatch(setProductsByCategory(data))
        setProductsToRender(data)
      })
    }, [category])

    useEffect(() => {
        setProductsToRender(products)
    }, [products])

    useEffect(() => {
     getPrices()
     setPriceRange(prices)
  }, [products])

    useEffect(() => {
          const productsToFilter = products.filter(product => product.rating.rate > rating)
          setProductsByRiting(productsToFilter)
          dispatch(ratingFilter(productsToFilter))
    }, [rating])

    useEffect(() => {
      const productsByPrices = products.filter(product => {
        return(product.price >= priceRange[0] && product.price <= priceRange[1])
      })
        setProductsByPrices(productsByPrices)
        dispatch(priceFilter(productsByPrices))
    }, [priceRange])

    const renderList = (productsToRender.length) ? (
      productsToRender.map(product => {
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
                    />
                </div>
              )
            })
    ) : (<>no result</>)

    return(
      (productsToRender.length) ? (<Grid container>
        <Grid item xs={12} md={0} sx={{mt: 2, display: "flex", justifyContent: "center"}}>
        <Box sx={{ display: {xs: 'block', md: 'none'} }} >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ border: "1px solid grey" }}
            onClick={() => {
              handleClick()
            }}
          >
            <TuneIcon sx={{ color: "grey" }}/>
          </IconButton>
        </Box>
        </Grid>
        <Grid item xs={12} md={2} sx={{display: isActive ? {xs: "flex", md: "flex"} : {xs: "none", md: "flex"},  justifyContent: "center", p: 2}}>
          <FiltersPanel
            rating={rating}
            setRating={setRating}
            prices={prices}
            setPrices={setPrices}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setProductsToRender={setProductsToRender}
            productsByPrices={productsByPrices}
            setProductsByPrices={setProductsByPrices}
            productsByRating={productsByRating}
            setProductsByRiting={setProductsByRiting}
            setIsActive={setIsActive}
            isActive={isActive}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{display: isActive ? {xs: "none", md: "flex"} : {xs: "flex", md: "flex"}, flexWrap: "wrap", justifyContent: "center", p: 0, mt: 2}}>
         {renderList}
        </Grid>
      </Grid>) : (<div style={{width: "100vw", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"}}>Loading...</div>)
      
    )
}