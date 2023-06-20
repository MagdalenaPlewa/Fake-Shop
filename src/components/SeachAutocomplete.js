import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Link } from '@mui/material';
import { grey} from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProductsData } from './Api';
import { searchProducts, setProducts, setProductsByCategory } from '../redux/actions';
import { ProductCardRender } from './ProductCardRender';
import ProductsSearching from './ProductsSearching';

export default function ComboBox() {
  // const products = useSelector(state => state.ProductsSearching.products)
  const dispatch = useDispatch()

    const [titles, setTitles] = React.useState([])
    const [inputValue, setInputValue] = React.useState([])
    const [searchElement, setSearchElement] = React.useState("")
    const [productsToRender, setProductsToRender] = React.useState([])


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

  const getProducts = () => {
    fetchProductsData().then(data => {
      setSearchElement(data)
      if(searchElement.length !== 0){
        const searchProduct = searchElement.filter(product => product.title === inputValue)
        if(searchProduct.length !==0){
          dispatch(searchProducts(searchProduct))
        }
        else{
          const searchedProductsArr = []
          const productsTitle = searchElement.map(product => product.title.toLowerCase())
          const searchedTitles = productsTitle.filter(el => el.includes(inputValue))
          searchElement.forEach(product => {
            searchedTitles.forEach((element => {
              if(product.title.toLowerCase() === element){
                searchedProductsArr.push(product)
              }
            }))
            dispatch(searchProducts(searchedProductsArr))
            console.log(searchedProductsArr)
          });
        }
      }
      })

  }

  React.useEffect(() => {
    getProducts()
  }, [inputValue])

  // const handleInput = (event) => {
  //   setInputValue(prevState => [...prevState, event].join(''))
  // }
  // console.log(handleInput() )
  const handleSubmit = (event, target) => {
    if(target.length >=3){
      setInputValue(target)
    }
   
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
        <Paper style={{ backgroundColor: grey[100] }}
        // onClick={(event) => console.log(event.target.innerText)}

        // onSubmit={event => handleSubmit(event)}

        // onSelect={(event) => handleSubmit(event)}
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
      // onInput={event => console.log(event.nativeEvent.data)}
      // onSubmit={event => console.log(event)}
      onSelect={(event) => handleSubmit(event, event.target.value)}
      // onClick={event => console.log(event)}
      // onKeyDown={event => handleSubmit(event, event.target.value)}
      />}
      onKeyDown={event => handleSubmit(event, event.target.value)}
      
    />
    {/* <ProductsSearching/> */}
    </>

  );
}

