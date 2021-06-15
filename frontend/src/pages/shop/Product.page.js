import React from 'react'

const ProductPage = ({ match }) => {
    return (
        <div>
            {match.params.id} Product Page
        </div>
    )
}

export default ProductPage
