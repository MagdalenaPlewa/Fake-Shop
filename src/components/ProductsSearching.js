import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsData } from "./Api"
import { searchProducts, ratingFilter, priceFilter, setProducts } from "../redux/actions"
import { ProductCardRender } from "./ProductCardRender"
import FiltersPanel from "./FiltersPanel"

import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';

import { Grid, Box } from "@mui/material";

const ProductsSearching = ({}) => {
    
    const searchElement = useSelector(state => state.allProducts.products)
    const products = useSelector(state => state.searchingProducts.products)

    const dispatch = useDispatch()
    const {inputValue} = useParams()

    const [productsToRender, setProductsToRender] = useState([])
    const [productsByPrices, setProductsByPrices] = useState([])
    const [productsByRating, setProductsByRiting] = useState([])
    const [prices, setPrices] = useState([])
    const [priceRange, setPriceRange] = useState([]);
    const [rating, setRating] = useState("0");
    const [isActive, setIsActive] = useState(false)

   const getProducts = () => {
    fetchProductsData().then(data => {
        dispatch(setProducts(data))
      })
  }

  const searchingProducts = () => {
      if(searchElement.length !== 0){
        const searchProduct = searchElement.filter(product => product.title.toLowerCase().includes(inputValue.toLowerCase()))
        if(searchProduct.length !==0){
          dispatch(searchProducts(searchProduct))
        }
        else{
          const searchedProductsArr = []
          const productsTitle = searchElement.map(product => product.title.toLowerCase())
          const searchedTitles = productsTitle.filter(el => el.includes(inputValue))
          searchElement.forEach(product => {
            searchedTitles.forEach((element => {
              if(product.title.toLowerCase() === element){
                searchedProductsArr.push(product)
              }
            }))
            dispatch(searchProducts(searchedProductsArr))
          })
        }
      }
  }

  const getPrices = () => {
    setProductsToRender(products)
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
    getProducts()
  }, [])

  useEffect(() => {
    searchingProducts()
  }, [searchElement])


   useEffect(() => {
    setProductsToRender(products)
}, [])

    useEffect(() => {
        getPrices()
    }, [products])

    useEffect(() => {
        setPriceRange(prices)
    }, [prices])

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
            productsByRating={productsByRating}
            setIsActive={setIsActive}
            isActive={isActive}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{display: isActive ? {xs: "none", md: "flex"} : {xs: "flex", md: "flex"}, flexWrap: "wrap", justifyContent: "center", p: 0, mt: 2}}>
         {renderList}
        </Grid>
        </Grid>
    )
}

export default ProductsSearching