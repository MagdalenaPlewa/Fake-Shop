import { useSelector } from 'react-redux';
import { ProductCardRender } from './ProductCardRender';

import { Box } from '@mui/material';

const Wishlist = () => {


  const wishlistProducts = useSelector(state => state.setWishProduct)

      const renderCards = wishlistProducts.length ? wishlistProducts.map((product) => {
        const {id, title, image, price, rating} = product
        return(
                <div key={id}>
                  <ProductCardRender
                  product={product}
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating.rate}
                  />
               </div>
        )}
    ) : <><Box sx={{display: "flex", width: "100%", justifyContent: "center", m: 2, fontSize: "22px"}}>There's no items here</Box></>
    return(
      <>
        <Box sx={{display: "flex", p: {sx: 2, md: 5}}}>
          {renderCards}
        </Box>
      </>

    )
}

export default Wishlist



