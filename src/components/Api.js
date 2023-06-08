export const fetchProductsData = async () => {
    return fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
}

export const fetchProductsCategory = async () => {
    return fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
}

export const fetchProductDetails = async (id) => {
    return fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
}

export const fetchProductsByCategory= async (category) => {
    return fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res=>res.json())
}