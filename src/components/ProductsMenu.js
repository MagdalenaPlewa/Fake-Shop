import AppBar from '@mui/material/AppBar';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Grid, Box, useMediaQuery } from '@mui/material';
import { blue, orange, grey } from '@mui/material/colors'

import { RenderCategoryLinks } from './ProductsCategory';

const ProductsMenu = ({menuOpen}) => {

    const isDesktop = useMediaQuery('(min-width: 600px)')

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
                    </Grid>
                </Grid>
            </Box>
        </AppBar> ) : (

        <AppBar position="fixed"
        sx={{ m: 2, top: 50, left: 0, width: "50%", display: menuOpen ? 'block' : 'none'}}>
            <Box sx={{ bgcolor: orange[50], p: 2}}>
                <Box>
                   <RenderCategoryLinks/>
                </Box>
                <Box sx={{display: "flex"}}>
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
                </Box>
            </Box>
        </AppBar>
      )
    }
    </>
    )
}

export default ProductsMenu