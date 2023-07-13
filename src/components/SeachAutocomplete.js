import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper } from '@mui/material';
import { grey} from '@mui/material/colors';

import { fetchProductsData } from './Api';
import { NavLink } from 'react-router-dom';

export default function ComboBox() {

    const [titles, setTitles] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [click, setClick] = useState(false)

    const inputRef = useRef(null)

    const productsData = () => {
      const titleArr = []
      fetchProductsData().then(data => {
        data.map(product => {
          titleArr.push(product.title)
          return (
            setTitles(titleArr)
          )
        })
      })
    }

  useEffect(() => {
    productsData()
}, [])

  useEffect(() => {
    inputRef.current.click()
  }, [inputValue])

  const submitHandler = (event, target) => {
    console.log(event, "handler", target)
    if(event.type === "select" && target.length === 0){
      setClick(false)
    }
    if(event.type === "select" && target.length >= 3){

      setInputValue(target)
      setClick(true)
    }
  }

  return (
    <>
    <NavLink to={`/products-searching/${inputValue}`} ref={inputRef} onClick={(e) => {
      if(inputValue.length <= 0 || click === false) {
        e.preventDefault()
      }
    }}>
    <Autocomplete 
      disablePortal
      placeholder="Search…"
      id="combo-box-demo"
      options={titles}
      PaperComponent={({ children }) => (
        <Paper style={{ backgroundColor: grey[100] }}
        >{children}</Paper>
      )}
      sx={{
        bgcolor: "grey",
        '& .MuiFormLabel-root.Mui-focused': {
          bgcolor: grey[500],
          color: "white",
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .Mui-focused': {
          bgcolor: grey[400],
          borderRadius: "1px",
          color: "black"
        },
      }}
      renderInput={(params) => <TextField {...params} label="Search..."
      onSelect={(event) => submitHandler(event, event.target.value)}
      />}
      onKeyDown={event => submitHandler(event, event.target.value)}
    />
    </NavLink>
    </>

  );
}

