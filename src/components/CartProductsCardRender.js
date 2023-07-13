import React from 'react'
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import Link from '@mui/material/Link';
import { Box, IconButton, Button, Grid } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addToWishlist, deleteFromWishlist, addToCart, deleteFromCart, removeItemFromCart } from '../redux/actions';

export const CartProductCardRender = ({product, id, title, image, price}) => {

  const styles = { link: { textDecoration: "none", color: "black" }};
  const dispatch = useDispatch()

  const wishlistProducts = useSelector(state => state.setWishProduct)
  const cart = useSelector(state => state.setCart)

  const [toWishlist, setToWishlist] = useState(false)
  const [toCart, setToCart] = useState(false)
  const [amound, setAmound] = useState()

  const MinusBtn = styled(Button)({
    fontSize: 27,
    lineHeight: 1,
    color: "black",
    height: 40,
    border: '1px solid',
    borderRadius: "50% 0 0 50%",
    borderColor: grey[300],
    '&:hover': {
      backgroundColor: grey[300],
      borderColor: grey[600],
    },
  });

  const PlusBtn = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 27,
    lineHeight: 1,
    color: "black",
    height: 40,
    border: '1px solid',
    borderRadius: "0 50% 50% 0",
    marginRight: "50px",
    borderColor: grey[300],
    '&:hover': {
      backgroundColor: grey[300],
      borderColor: grey[600],
    },
  });

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
      dispatch(addToCart(product))
  }

  const handleReduceInCart = (product) => {
    if(product.qty > 1){
      dispatch(deleteFromCart(product))
    }
    if(product.qty === 1){
      return
    }
  }

  const handleRemoveFromCart = (product) => {
    dispatch(removeItemFromCart(product))
  }

  const pricesAmound = (product) => {
    let amound = (product.price*product.qty).toFixed(2)
      setAmound(amound)

  }

  useEffect(() => {
    wishlistProducts.find(wishProduct => {
      if(product.id === wishProduct.id){
        setToWishlist(true)
      }
    })
  }, [])

  useEffect(() => {
    cart.find(item => {
      if(product.id === item.id){
        setToCart(true)
      }
    })
  }, [])

  useEffect(() => {
    pricesAmound(product)
  }, [product.qty])

       return(
            <div key={id}>
              <Card sx={{m: 2 }}>
                <Grid container sx={{border: "1px solid", borderColor: grey[300]}}>
                  <Grid item xs={2} sx={{p:2, width: 150, height: 200, display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
                    <NavLink to={`/product/${id}`} style={styles.link}>
                      <CardMedia 
                      component="img"
                      sx={{maxHeight: 250, width: 100}}
                      image={image}
                      alt={title}
                      />
                    </NavLink>
                  </Grid>
                  <Grid item xs={7} sx={{p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <Typography variant="body2" component="div" sx={{ width: "100%", textAlign: "left", fontSize: "22px"}} >
                          {title}
                    </Typography>
                    <Typography sx={{color: "red", fontWeight: 'bold', fontSize: "20px", display: "flex", alignItems: "center", bgcolor: "green", height: 40}}>
                        {`${price.toFixed(2)} $`}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ p: 2, display: "flex", justifyContent: "flex-end", alignItems: "flex-end", position: "relative"}}>
                    <Box sx={{display: "flex", height: 40}}>
                      <MinusBtn variant='outlined' onClick={() => {
                        handleReduceInCart(product)
                      }}>-</MinusBtn>
                      <Typography sx={{ fontSize: "20px", width: 50, border: "1px solid", borderColor: grey[300], display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {`${product.qty}`}
                      </Typography>
                      <PlusBtn variant='outlined' onClick={() => {
                        handleAddToCart(product)
                      }}>+</PlusBtn>
                      <Typography sx={{ fontWeight: 'bold', fontSize: "22px", width: 250, display: "flex", flexWrap: "wrap", justifyContent: "flex-end",alignItems: "center", bgcolor: "blue", mr: 5}}>
                        {`${amound} $`}
                    </Typography>
                    </Box>
                    <IconButton sx={{ position: "absolute" , top: 0, right: 0, '&:hover' :{color: "red", cursor: "pointer" }}} 
                      onClick={() => handleAddToWishlist(product)}>
                      <FavoriteBorderIcon fontSize="large" sx={{color: toWishlist ? "red" : "grey"}}/>
                    </IconButton>
                    <IconButton sx={{ position: "absolute" , bottom: 0, right: 0, '&:hover' :{color: "red", cursor: "pointer" }}}
                       onClick={() => handleRemoveFromCart(product)}>
                      <DeleteForeverOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
           </div>
        )
}