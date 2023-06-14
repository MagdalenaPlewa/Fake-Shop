import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { grey, orange } from '@mui/material/colors';

import { fetchProductsData } from './Api';

export default function ComboBox() {

    const [titles, setTitles] = React.useState([])

    const productsData = () => {
      const titleArr = []
      fetchProductsData().then(data => {
        data.map(product => {
          titleArr.push(product.title)
          return (
            setTitles(titleArr)
          )
        } 
      )
      })
  }

     React.useEffect(() => {
          productsData()
     }, [])

  return (
    <>

    <Autocomplete
      disablePortal
      placeholder="Search…"
      id="combo-box-demo"
      options={titles}
      PaperComponent={({ children }) => (
        <Paper style={{ backgroundColor: grey[100] }}>{children}</Paper>
      )}
      sx={{
        bgcolor: "grey",
        '& .MuiFormLabel-root.Mui-focused': {
          color: "white",
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .Mui-focused': {
          bgcolor: grey[500],
          borderRadius: "1px",
          color: "white"
        },
      }}

      renderInput={(params) => <TextField {...params} label="Search..."/>}
    />
    </>

  );
}

