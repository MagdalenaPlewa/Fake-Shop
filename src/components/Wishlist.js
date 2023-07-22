import { useSelector } from 'react-redux';
import { ProductCardRender } from './ProductCardRender';

const Wishlist = () => {

  const wishProduct = useSelector(state => state.setWishProduct)

    const renderCards = wishProduct.length ? wishProduct.map((product) => {
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
    ) : <><div style={{display: "flex", width: "100%", justifyContent: "center", m: 2, fontSize: "18px"}}>There's no items here</div></>
    return(
            <div style={{display: "flex"}}>
                {renderCards}
            </div>
    )
}

export default Wishlist



