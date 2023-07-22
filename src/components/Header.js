import * as React from 'react';
import ProductsMenu from './ProductsMenu';
import ComboBox from './SeachAutocomplete';
import { NavLink } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import { grey } from '@mui/material/colors'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchAppBar() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const styles = { link: { textDecoration: "none", color: "White" }};

  const hendleMeneClick = () => {
    setMenuOpen(open => !open)
  }

  return (
    <>
      <AppBar position="static" sx={{bgcolor: grey[600], height: "90px", display: "flex", justifyContent: "center", width: "100%"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              hendleMeneClick()
            }}
          >
            <MenuIcon sx={{ display: { xs: 'block', sm: 'none'}} }/>
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
          >
            <NavLink to="/" style={styles.link}>
              Fake Shop
            </NavLink>
          </Typography>

          <Search sx={{minWidth: {sx: "250px", sm: "300px"}, 
          '& .css-12kl8iw': {
            paddingLeft: {xs: 0, sm: "50px"}
          }}}>
          <SearchIconWrapper>
            <SearchIcon  sx={{bgcolor: grey[550], height: "100%", display: {xs: "none", sm: "flex"}}}/>
          </SearchIconWrapper>
          <Box sx={{pl: 7}}>
            <ComboBox />
          </Box>

          </Search>
          <Box sx={{display: {xs: "none", sm: "flex"}}}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
              >
                  <AccountCircle sx={{color: "white"}}/>
              </IconButton>
              <IconButton
                  size="large"
                  aria-label="account of current user"
              >
                  <MailIcon sx={{color: "white"}}/>
              </IconButton>
          </Box>

        </Toolbar>

      </AppBar>
      <ProductsMenu 
        menuOpen={menuOpen}
      />
    </>
  );
}