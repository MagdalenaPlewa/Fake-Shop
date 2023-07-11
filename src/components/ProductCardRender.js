import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, IconButton, Rating } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from 'react';
import { addToCart, addToWishlist, deleteFromCart, deleteFromWishlist } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const ProductCardRender = ({product, id, title, image, price, rating}) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[600],
      },
    },
  });

  const styles = { link: { textDecoration: "none", color: "black" }};
  const dispatch = useDispatch()

  const wishlistProducts = useSelector(state => state.setWishProduct)

  const [toWishlist, setToWishlist] = useState(false)
  const [toCart, setToCart] = useState(false)

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
    else{
      setToCart(false)
      dispatch(deleteFromCart(product))
    }
  }

  useEffect(() => {
    wishlistProducts.find(wishProduct => {
      if(product.id === wishProduct.id){
        setToWishlist(true)
      }
    })
  }, [])

       return(
            <div key={id}>
                <Card sx={{ height: 550, width: 250, m: 2, p: 1, position: "relative", display: "flex", justifyContent:"center"}}>
                  <IconButton onClick={() => handleAddToWishlist(product)} sx={{position: "absolute", right: 5}}>
                  <FavoriteBorderIcon fontSize="large" sx={{color: toWishlist ? "red" : "grey"}}/>
                  </IconButton>
                    <NavLink to={`/product/${id}`} style={styles.link}>
                      <CardMedia
                      component="img"
                      sx={{maxHeight: 330, pt: 5, mt: 1 }}
                      image={image}
                      alt={title}
                    />
                      <CardContent sx={{ p: 0, width: "100%", position: "absolute", bottom: 55, left: 0, display: "flex", flexWrap: "wrap", justifyContent: "center"}} >
                        <Typography variant="body2" component="div" sx={{ p: 3, width: "100%", textAlign: "center", fontSize: "20px"}}>
                          {title.length > 25 ? title.slice(0, 25) + "..." : title}
                        </Typography>
                      </CardContent>
                    </NavLink>
                    <Box sx={{ position: "absolute", bottom: 0, mt: 1, textAlign: "center", display: "flex", flexDirection: "column"}}>
                      <Typography sx={{color: "red", fontWeight: 'bold', fontSize: "22px"}}>
                        {`${price.toFixed(2)} $`}
                      </Typography>

                      <Rating name="read-only" value={rating} precision={0.5}  size="small" readOnly/>  
                      <IconButton theme={theme} color="primary" aria-label="add to shopping cart" onClick={() => handleAddToCart(product)}>
                        <AddShoppingCartIcon fontSize='large' />
                      </IconButton>
                    </Box>
                    <Box>

                    </Box>
                    
                </Card>
           </div>
        )
}