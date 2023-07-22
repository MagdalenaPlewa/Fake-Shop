import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RenderCategoryLinks } from './ProductsCategory';

import AppBar from '@mui/material/AppBar';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Grid, Box, useMediaQuery, Badge } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { orange} from '@mui/material/colors'

const ProductsMenu = ({menuOpen}) => {

    const isDesktop = useMediaQuery('(min-width: 600px)')
    const [totalQty, setTotalQty] = useState()
  
    const wishProduct = useSelector(state => state.setWishProduct)
    const cart = useSelector(state => state.setCart)
  
    const styles = { link: { textDecoration: "none", color: "black" }};
  
    const summary = cart.map((product) => {
      let totalQty = product.qty
        return(
          totalQty
        )
    })
  
    useEffect(() => {
      const initialValue = 0;
      const total = summary.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      setTotalQty(total)
    }, [cart])

    return(
    <>
        {
        isDesktop ? (
        <AppBar position="sticky"
            sx={{ display: { xs: 'block', sm: 'block'}, mb: 3}}>
            <Box sx={{ flexGrow: 1, bgcolor: orange[50], pl: 3, pr: 3 }}>
                <Grid container>
                    <Grid item sm={10} sx={{ display: "flex",flexWrap: "wrap", alignItems: "center" }}>
                      <Box sx={{ width: "100%"}}>
                         <RenderCategoryLinks/>
                      </Box>
                    </Grid>
                    <Grid item sm={2} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <IconButton
                      size="large"
                    >
                      <Badge badgeContent={wishProduct.length} color="error">
                        <NavLink to="/wishlist" style={styles.link}>
                         <FavoriteBorderIcon sx={{color: "grey"}}/>
                        </NavLink>
                      </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                    >
                      <Badge badgeContent={totalQty} color="error">
                        <NavLink to="/cart" style={styles.link}>
                         <ShoppingCartOutlinedIcon sx={{color: "grey"}}/>
                        </NavLink>
                      </Badge>
                    </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </AppBar> ) : (

        <AppBar position="fixed"
        sx={{ m: 2, top: 75, left: 0, width: "50%", display: menuOpen ? 'block' : 'none', borderRadius: "3px"}}>
            <Box sx={{ bgcolor: orange[50], p: 2, borderRadius: "3px"}}>
                <Box>
                  <NavLink to="/" style={styles.link}>Fake Shop</NavLink>
                   <RenderCategoryLinks/>

                </Box>
                <Box sx={{display: "flex"}}>
                <IconButton
                  size="large"
                >
                  <Badge badgeContent={wishProduct.length} color="error">
                    <NavLink to="/wishlist" >
                     <FavoriteBorderIcon sx={{color: "grey"}}/>
                    </NavLink>
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                >
                  <Badge badgeContent={totalQty} color="error">
                    <NavLink to="/cart" >
                     <ShoppingCartOutlinedIcon sx={{color: "grey"}}/>
                    </NavLink>
                  </Badge>
                </IconButton>
                </Box>
                <Box sx={{ display: "flex"}}>
                            <IconButton
                              size="large"
                              aria-label="show 4 new mails"
                            >
                              <MailIcon/>
                            </IconButton>
                            <IconButton
                              size="large"
                              aria-label="account of current user"
                            >
                              <AccountCircle />
                            </IconButton>
                            <IconButton
                              size="large"
                              aria-label="account of current user"
                            >
                              <AccountCircle />
                            </IconButton>
                    </Box>
            </Box>
        </AppBar>
      )
    }
    </>
    )
}

export default ProductsMenu