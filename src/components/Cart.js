import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CartProductCardRender } from './CartProductsCardRender';

import { Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey, green } from '@mui/material/colors';
import { createTheme } from '@mui/material';

export const Cart = () => {

  const cart = useSelector(state => state.setCart)

  const [cartItems, setCartItems] = useState(false)
  const [totalPrices, setTotalPrices] = useState(0)

  const theme = createTheme({
    palette: {
      primary: {
        main: green[600],
      },
    },
  });

  const summary = cart.map((product) => {
    let totalPrices = product.qty*product.price
      return(
        totalPrices
      )
  })

  useEffect(() => {
    if(cart.length > 0){
      setCartItems(true)
    }
    else{
      setCartItems(false)
    }
  }, [cart])

  useEffect(() => {
    const initialValue = 0;
    const total = summary.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    setTotalPrices(total)
  }, [cart])

    const renderCards = cart.length ? cart.map((product) => {
        const {id, title, image, price} = product
        return(
          <div key={id}>
            <CartProductCardRender
              product={product}
              id={id}
              title={title}
              image={image}
              price={price}
            />
          </div>
        )}
    ) : <><div style={{display: "flex", width: "100%", justifyContent: "center", m: 2, fontSize: "24px"}}>There's no items here</div></>
    return(
        <>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <div style={{display: "flex", flexDirection: "column"}}>
                {renderCards}
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
            <Card sx={{ maxWidth: "100%", height: "50vh", m: 2, display: cartItems ? "block" : "none", border: "1px solid", borderColor: grey[300], bgcolor: grey[200], position: "relative"}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 'bold', fontSize: "26px", textAlign: "center"}}>
                  Order Summary
                </Typography>
                <Typography variant="body2" color="text.secondary"  sx={{fontWeight: 'bold', fontSize: "26px", textAlign: "center"}}>
                  {`${totalPrices.toFixed(2)} $`}  
                </Typography>
              </CardContent>
              <Button theme={theme} variant="contained" sx={{width: "100%", height: 75, fontSize: "24px", fontWeight: "bold", mt: 5, position: "absolute", bottom: 0}}>Buy now</Button>
            </Card>
            </Grid>

          </Grid>

        </>
    )
}
