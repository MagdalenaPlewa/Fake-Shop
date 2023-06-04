import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { blue, orange, grey } from '@mui/material/colors'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { RenderCategoryLinks } from './ProductsCategory';

// import Badge from '@mui/material/Badge';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const styles = { link: { textDecoration: "none", color: "White" }};
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: grey[600]}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ display: { xs: 'block', sm: 'none'}} }/>
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
          >
            <Link href="/" style={styles.link}>
              Fake Shop
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <AppBar position="sticky"
        sx={{ display: { xs: 'none', sm: 'block'}, mb: 3}}>
            <Box sx={{ flexGrow: 1, bgcolor: orange[50], pl: 3, pr: 3 }}>
                <Grid container>
                    <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%"}}>
                         <RenderCategoryLinks/>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
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
      </AppBar> 
    </Box>
  );
}