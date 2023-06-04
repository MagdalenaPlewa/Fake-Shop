import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography, FormControl, Select, InputLabel, MenuItem, Grid, CircularProgress} from '@mui/material'


const FiltersPanel = ({rating, setRating}) => {
    // const [value, setValue] = useState([0, 50]);
    
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };

    // function valuetext(value) {
    //     return(value)
    //   }

      const styles = {formControl: {
        border: "1px, solid grey",
        width: 200}}

  
    return (
        <>
            <Box sx={{ width: 200, p:2 }}>
                <Slider sx={{ color: "grey" }}
                //   getAriaLabel={() => 'Temperature range'}
                //   value={value}
                //   onChange={handleChange}
                //   valueLabelDisplay="auto"
                //   getAriaValueText={valuetext}
                />
                <FormControl variant="standard"  style={styles.formControl}>
                <InputLabel >Ranking</InputLabel>
                <Select
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





