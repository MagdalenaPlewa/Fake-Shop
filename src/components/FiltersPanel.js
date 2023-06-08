import * as React from 'react';
import { useState, useEffect } from 'react';

import styles from "./FiltersPanel.module.css"

import { Box, FormControl, Slider, Select, InputLabel, MenuItem, Paper} from '@mui/material'

import { createTheme } from '@mui/material/styles';

import { styled } from '@mui/material/styles';

const FiltersPanel = ({rating, setRating, minPrice, maxPrice, prices, priceRange, setPrices, setPriceRange}) => {

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
      width: 200,
    },
  }

    return (
        <>
            <Box sx={{ width: 200, p:2 }}>
                <Slider sx={{
                  color: 'grey',
                  '& .MuiSlider-thumb': {
                    border: '1px solid black',
                    bgcolor: "transparent"
                  },
                }}
                  value={priceRange}
                  min={prices[0]}
                  max={prices[1]}
                  onChange={(e) => {
                    // setPriceRange(e.target.value)
                    setPriceRange(e.target.value)
                  }}
                  size="small"
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
            </Box>
        </>
    );
}

export default FiltersPanel