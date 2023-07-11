import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ProductCardRender } from './ProductCardRender';

const Wishlist = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[600],
      },
    },
  });

  const wishProduct = useSelector(state => state.setWishProduct)
    const styles = { link: { textDecoration: "none", color: "black" }};

    const renderCards = wishProduct.length ? wishProduct.map((product) => {
        const {id, title, image, price, rating} = product
        return(
            <>
                <div key={id}>
                  <ProductCardRender
                  product={product}
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating.rate}
                  />
                    {/* <Card sx={{ height: 300, width: 150, m: 2, p: 1, position: "relative", display: "flex", justifyContent:"center"}}>
                      <IconButton sx={{position: "absolute", right: 5, '&:hover' :{
                      color: "red", cursor: "pointer"

                      }}}>
                      <FavoriteBorderIcon />
                      </IconButton>
                        <NavLink to={`/product/${id}`} style={styles.link}>
                          <CardMedia
                          component="img"
                          sx={{maxHeight: 150, pt: 4 }}
                          image={image}
                          alt={title}
                        />
                          <CardContent sx={{ p: 0, width: "100%", position: "absolute", bottom: 20, left: 0, display: "flex", flexWrap: "wrap", justifyContent: "center"}} >
                            <Typography variant="body2" component="div" sx={{ p: 3, width: "100%", textAlign: "center"}} >
                              {title.slice(0, 25)}
                            </Typography>
                          </CardContent>
                        </NavLink>
                        <Box sx={{ position: "absolute", bottom: 0, mt: 1, textAlign: "center"}}>
                          <Typography sx={{color: "red", fontWeight: 'bold'}}>
                            {`${price.toFixed(2)} $`}
                          </Typography>
                          <IconButton theme={theme} color="primary" aria-label="add to shopping cart">
                            <AddShoppingCartIcon />
                          </IconButton>
                        </Box>
                    </Card> */}
               </div>
            </>
        )}
    ) : <><div style={{display: "flex", width: "100%", justifyContent: "center", m: 2, fontSize: "18px"}}>There's no items here</div></>
    return(
        <>
            <div style={{display: "flex"}}>
                {renderCards}
            </div>
        </>
    )
}

export default Wishlist



