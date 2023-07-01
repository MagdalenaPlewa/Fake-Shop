import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, IconButton, Rating } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';
import { addToWishlist } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const ProductCardRender = ({product, id, title, image, price, rating}) => {

  const styles = { link: { textDecoration: "none", color: "black" }};
  const dispatch = useDispatch()

  const wishProduct = useSelector(state => state.setWishProduct)
  console.log(wishProduct)


  const handleAddProduct = (product) => {
    dispatch(addToWishlist(product))
  }

       return(
            <div key={id}>
                <Card sx={{ height: 500, width: 250, m: 2, p: 1, position: "relative", display: "flex", justifyContent:"center"}}>
                  <IconButton onClick={() => handleAddProduct(product)} sx={{position: "absolute", right: 5, '&:hover' :{
                  color: "red", cursor: "pointer"

                  }}}>
                  <FavoriteBorderIcon />
                  </IconButton>
                    <Link href={`/product/${id}`} style={styles.link}>
                      <CardMedia
                      component="img"
                      sx={{maxHeight: 330, pt: 4 }}
                      image={image}
                      alt={title}
                    />
                      <CardContent sx={{ p: 0, width: "100%", position: "absolute", bottom: 20, left: 0, display: "flex", flexWrap: "wrap", justifyContent: "center"}} >
                        <Typography variant="body2" component="div" sx={{ p: 3, width: "100%", textAlign: "center"}} >
                          {title}
                        </Typography>
                      </CardContent>
                    </Link>
                    <Box sx={{ position: "absolute", bottom: 10, mt: 1, textAlign: "center"}}>
                      <Typography sx={{color: "red", fontWeight: 'bold'}}>
                        {`${price.toFixed(2)} $`}
                      </Typography>
                        <Rating name="read-only" value={rating} precision={0.5}  size="small" readOnly/>  
                    </Box>
                    
                </Card>
           </div>
        )
}