import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, IconButton, Rating } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from "./Api"
import { setProductsByCategory, clearProducts, ratingFilter, priceFilter } from "../redux/actions"
// import { clearProducts } from "../redux/actions"
import { ProductCardRender } from "./ProductCardRender"
import FiltersPanel from "./FiltersPanel"

const Wishlist = () => {
    
    const wishProduct = useSelector(state => state.setWishProduct)
    const styles = { link: { textDecoration: "none", color: "black" }};
    console.log(wishProduct)

    const renderCards = wishProduct.map((product) => {
        const {id, title, image, price, rating} = product
        return(
            <>
                <div key={id}>
                    <Card sx={{ height: 200, width: 100, m: 2, p: 1, position: "relative", display: "flex", justifyContent:"center"}}>
                      <IconButton sx={{position: "absolute", right: 5, '&:hover' :{
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
                            <Rating name="read-only" value={rating.rate} precision={0.5}  size="small" readOnly/>  
                        </Box>
                    </Card>
               </div>
            </>
        )}
    )
    return(
        <>
            <div style={{display: "flex"}}>
                {renderCards}
            </div>
        </>
    )
}

export default Wishlist



