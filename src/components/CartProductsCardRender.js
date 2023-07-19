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
  const [amount, setAmount] = useState()

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

  const pricesamount = (product) => {
    let amount = (product.price*product.qty).toFixed(2)
      setAmount(amount)

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
    pricesamount(product)
  }, [product.qty])

       return(
            <div key={id}>
              <Card sx={{m: 2 }}>
                <Grid container sx={{border: "1px solid", borderColor: grey[300], height: {xs: 260, md: 200}}} >
                  <Grid item xs={4} md={2} sx={{ width: 150, height: 150, display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
                    <NavLink to={`/product/${id}`} style={styles.link}>
                      <CardMedia 
                      component="img"
                      sx={{maxHeight: 150, width: 85}}
                      image={image}
                      alt={title}
                      />
                    </NavLink>
                  </Grid>
                  <Grid item xs={8} md={5} sx={{p: 2, display: "flex", flexDirection: "column", }}>
                    <Typography variant="body2" component="div" sx={{ width: "100%", textAlign: "left", fontSize: {xs: "16px", md: "22px"}}} >
                          {title.slice(0, 25)}
                    </Typography>
                    <Typography sx={{color: "red", fontWeight: 'bold', fontSize: {xs: "16px", md: "20px"}, display: "flex", alignItems: "center", height: 40}}>
                        {`${price.toFixed(2)} $`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={5} sx={{ p: 2, display: "flex", flexDirection: {xs:"column", sm: "row"}, justifyContent: {xs: "space-between" ,sm: "flex-end"}, alignItems: "flex-end", position: "relative"}}>
                    <Box sx={{display: "flex", height: 40}}>
                      <MinusBtn variant='outlined' onClick={() => {
                        handleReduceInCart(product)
                      }}>-</MinusBtn>
                      <Typography sx={{ fontSize: {xs: "16px", md: "20px"}, width: {xs: 20, sm: 40}, border: "1px solid", borderColor: grey[300], display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {`${product.qty}`}
                      </Typography>
                      <PlusBtn variant='outlined' onClick={() => {
                        handleAddToCart(product)
                      }}>+</PlusBtn>
                    </Box>
                    <Box sx={{display: "flex", height: 40}}>
                      <Typography sx={{ fontWeight: 'bold', fontSize: {xs: "16px", md: "22px"}, width: 250, display: "flex", flexWrap: "wrap", justifyContent: "flex-end",alignItems: "center", mr: 5}}>
                        {`${amount} $`}
                    </Typography>
                    </Box>
                    <IconButton sx={{ position: "absolute" , top: {xs: -150, sm: -165, md: 0}, right: 0, '&:hover' :{color: "red", cursor: "pointer" }}} 
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