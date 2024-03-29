import * as React from 'react';
import { useSelector } from 'react-redux';

import { Box, FormControl, Slider, Select, InputLabel, MenuItem, Paper, Button} from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';


const FiltersPanel = ({rating, setRating, prices, priceRange, setPriceRange, setProductsToRender, productsByRating, productsByPrices, setIsActive, setNoResult, params}) => {

  const newTheme = createTheme({
    palette: {
      primary: {
        main: '#808080',
      }
    },
  });

  const Label = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.primary.main,
      '&.Mui-focused': {
        color: "black"
      },
    })
  );

  const style = {
    formControl: {
      width: "100%",
    },
    iconBox: {
      width: "50px",
      height: "50px",
      border: "1px solid green",
      opacity: 1,
      color: "red"
    }
  }

  const productsByCategory = useSelector(state => state.setProductsByCategory.products)
  const productsBySearching = useSelector(state => state.searchingProducts.products)

  const filteredProducts = () => {
    setIsActive(false)
    setNoResult(false)
    if(rating === "0"){
      const result = productsByPrices
      return result
    }
    else{
      const result = productsByPrices.filter(el => productsByRating.includes(el))
      if(result.length === 0){
        setNoResult(true)
      }
      return result
    }
   }

  const cleanFilter = () => {
    setIsActive(false)
    setPriceRange(prices)
    setRating("0")
    setNoResult(false)
    if(params === "category"){
      return productsByCategory
    }
    if(params === "inputValue"){
      return productsBySearching
    }
   }

    return (
      <>
       <Box sx={{ p: 0, mb: 3, width: {xs: "40%", md: "100%"}, fontSize: "18px" }} 
          >
          <Slider sx={{
            color: 'grey',
            '& .MuiSlider-thumb': {
              border: '1px solid black',
              bgcolor: "transparent"
            },
          }}
            size="small"
            value={priceRange}
            min={prices[0]}
            max={prices[1]}
            onChange={(e) => {
              setPriceRange(e.target.value)
            }}
          />
          <Box sx={{mb: 5, display: "flex", justifyContent: "space-between"}}>
            <Paper elevation={0}>{priceRange[0]} $</Paper>
            <Paper elevation={0}>{priceRange[1]} $</Paper>
          </Box>
           <FormControl variant='standard' style={style.formControl} >
            <Label theme={newTheme}>Ranking</Label>
            <Select sx={{color: "black",
            '&:after': {
              borderBottom: "2px solid grey"
            }}}
            value={rating}
            onChange={(e) => {
              setRating(e.target.value)
            }}
           >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{display: "flex", justifyContent: "space-around", pt: 3}}>
          <Button sx={{border: "1px solid black", color: "grey", maxWidth: "50px", m: 1}} onClick={() => {
            setProductsToRender(filteredProducts())
          }}>Filter</Button>
          <Button sx={{border: "1px solid black", color: "grey", maxWidth: "50px", m: 1}} onClick={() => {
            setProductsToRender(cleanFilter())
          }}>RESET</Button>
          </Box>
        </Box>
      </>
    );
}

export default FiltersPanel