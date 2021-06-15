import React from 'react'

const ProductsPage = ({ match }) => {
    return (
        <div>
            {match.params.category} Products Page
        </div>
    )
}

export default ProductsPage