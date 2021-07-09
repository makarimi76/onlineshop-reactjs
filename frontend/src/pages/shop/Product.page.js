// Components
import ShopLayout from 'layout/shop/Shop.layout'

const ProductPage = ({ match }) => {
    return (
        <ShopLayout maxWidth='md'>
            {match.params.id} Product Page
        </ShopLayout>
    )
}

export default ProductPage
