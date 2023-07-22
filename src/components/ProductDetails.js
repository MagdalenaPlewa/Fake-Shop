import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProductDetails } from "./Api"
import { selectedProduct, clearProduct } from "../redux/actions"
import { deleteFromWishlist, addToCart, addToWishlist } from "../redux/actions"

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors'
import { Button, createTheme } from "@mui/material"
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export const ProductDetails = () => {

    const theme = createTheme({
        palette: {
          primary: {
            main: grey[300],
          },
          secondary: {
            main: grey[50],
          },
        },
      });

    const product = useSelector(state => state.selectedProduct)
    const wishlistProducts = useSelector(state => state.setWishProduct)

    const [toWishlist, setToWishlist] = useState(false)
    const [toCart, setToCart] = useState(false)

    const { image, title, price, description } = product
    const {id} = useParams()
    const dispatch = useDispatch()

    const detailsData = () => {
        fetchProductDetails(id).then(data => {
            dispatch(selectedProduct(data))
        })
    }
  
    const handleAddToWishlist = (product) => {
      if(!toWishlist){
        setToWishlist(true)
        dispatch(addToWishlist(product))
      }
      else{
        setToWishlist(false)
        dispatch(deleteFromWishlist(product))
      }
    }
  
    const handleAddToCart = (product) => {
      if(!toCart){
        setToCart(true)
        dispatch(addToCart(product))
      }
    }
  
    useEffect(() => {
      wishlistProducts.find(wishProduct => {
        if(product.id === wishProduct.id){
          setToWishlist(true)
        }
      })
    }, [])

    useEffect(() => {
        if(id && id !== "") detailsData()
        return() => {
            dispatch(clearProduct())
        }
    }, [id])

    return(
        <div key={id}>
            {Object.keys(product).length !== 0 ? (
            <Grid container sx={{p: 5, bgcolor: grey[100]}}>
                <Grid item xs={12} md={6} sx={{display: "flex", justifyContent: "center"}}>
                    <Card sx={{p: 5, width: {xs: 250, sm: 350}}}>
                        <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                         />
                     </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{p: {xs: 1, sm: 5}, textAlign: {sx: "center", sm: "left"}}}>
                    <Typography component="div" sx={{mt: 2, fontWeight: "bold", fontSize: {xs: "14px", sm: "18px"}}}>
                        {title}
                    </Typography>
                    <Box sx={{mt: 2}}>
                        <Typography variant="body2" sx={{fontSize: {xs: "12px", sm: "14px"}, textAlign: "justify"}}>
                           {description}
                        </Typography>
                        <Box>
                            <Typography variant="h6" sx={{color: "red", fontWeight: 'bold', mt: 1}}>
                                {`${price.toFixed(2)} $`}
                            </Typography>
                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-around", mt: 2, mb: 2}}>
                                <Button theme={theme} variant="contained" sx={{minWidth: 120, height: 50, display: "flex", justifyContent: "space-around"}} onClick={() => handleAddToCart(product)}>
                                    <Typography component="div" sx={{fontSize: {xs: "14px", sm: "16px"}, mr: 2}}>
                                        Add to cart
                                    </Typography>
                                    <AddShoppingCartIcon fontSize='medium' sx={{display: {xs: "none", sm: "block"}}}/>
                                </Button>
                                <Button theme={theme} variant="contained" color="secondary" sx={{width: 50, height: 50, fontSize: "18px",  ml: 5, display: "flex", justifyContent: "space-around"}} onClick={() => handleAddToWishlist(product)}>

                                    <FavoriteBorderIcon fontSize='medium' sx={{color: toWishlist ? "red" : "grey"}} />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            ) : (
                <div>Loading....</div>
            )}

      </div>
    )
}