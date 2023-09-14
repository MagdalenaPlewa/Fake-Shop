import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { searchProducts } from "../redux/actions"
import { ProductCardRender } from "./ProductCardRender"
import FiltersPanel from "./FiltersPanel"

import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import { Grid, Box } from "@mui/material";

const ProductsSearching = () => {
    
    const allProducts = useSelector(state => state.allProducts.products)
    const products = useSelector(state => state.searchingProducts.products)

    const dispatch = useDispatch()
    const {inputValue} = useParams()

    const [productsToRender, setProductsToRender] = useState([])
    const [productsByPrices, setProductsByPrices] = useState([])
    const [productsByRating, setProductsByRating] = useState([])
    const [prices, setPrices] = useState([])
    const [priceRange, setPriceRange] = useState([]);
    const [rating, setRating] = useState("0");
    const [isActive, setIsActive] = useState(false)
    const [noResult, setNoResult] = useState(false)

  const searchingProducts = () => {
      if(allProducts.length !== 0){
        const searchProduct = allProducts.filter(product => product.title.toLowerCase().includes(inputValue.toLowerCase()))
        if(searchProduct.length !==0){
          dispatch(searchProducts(searchProduct))
          const closeBtn = [...document.getElementsByClassName("MuiAutocomplete-clearIndicator")][0]
          if(closeBtn){
              closeBtn.click()
          }

        }
        else{
          const searchedProductsArr = []
          const productsTitle = allProducts.map(product => product.title.toLowerCase())
          const searchedTitles = productsTitle.filter(el => el.includes(inputValue))
          allProducts.forEach(product => {
            searchedTitles.forEach((element => {
              if(product.title.toLowerCase() === element){
                searchedProductsArr.push(product)
              }
            }))
            dispatch(searchProducts(searchedProductsArr))
            const closeBtn = [...document.getElementsByClassName("MuiAutocomplete-clearIndicator")][0]
            if(closeBtn){
              closeBtn.click()
            }
          })
        }
      }
  }

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

  const getPriceSRange = () => {
    const priceArr = []
    productsToRender.map(product => {
      priceArr.push(product.price)
      return (
        setPriceRange([Math.min(...priceArr), Math.max(...priceArr)])
        )
      }
    )
  }

   const handleClick = () => {
    setIsActive(current => !current)
   }

  useEffect(() => {
    searchingProducts()
  }, [inputValue])

   useEffect(() => {
    setProductsToRender(products)
    setRating("0")
  }, [products])

  useEffect(() => {
    getPrices()
   }, [productsToRender])

   useEffect(() => {
    getPriceSRange()
   }, [prices])

  useEffect(() => {
    if(products.length !== 0){
      const productsToFilter = products.filter(product => product.rating.rate > rating)
      setProductsByRating(productsToFilter)
    }
  }, [rating])

  useEffect(() => {
    const productsByPrices = products.filter(product => {
      return(product.price >= priceRange[0] && product.price <= priceRange[1])
    })
      setProductsByPrices(productsByPrices)
  }, [priceRange])

    const renderList = (!noResult) ? (
      productsToRender.map(product => {
            const {id, title, image, price, rating} = product
              return(
                <div key={id}>
                    <ProductCardRender
                    id={id}
                    title={title}
                    image={image}
                    price={price}
                    rating={rating.rate}
                    product={product}

                    />
                </div>
            )
            })
    ) : ((<div style={{width: "100vw", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"}}><>no result</></div>))

    return(
      (products.length) ? (<Grid container>
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
            setNoResult={setNoResult}
            params={"inputValue"}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{display: isActive ? {xs: "none", md: "flex"} : {xs: "flex", md: "flex"}, flexWrap: "wrap", justifyContent: "center", p: 0, mt: 2}}>
         {renderList}
        </Grid>
        </Grid>) : (<div style={{width: "100vw", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"}}>no result</div>)
    
    )
}

export default ProductsSearching