import React from 'react'

//Componnets
import ProductsLayout from 'layout/shop/Products.layout'

const ProductsPage = ({ match }) => {
    return (
        <ProductsLayout>
            {match.params.category} Products Page
        </ProductsLayout>
    )
}

export default ProductsPage