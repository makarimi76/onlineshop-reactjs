import { Route, Switch } from 'react-router-dom'

import ProductsPage from 'pages/shop/products/Products.page'
import ProductPage from 'pages/shop/Product.page'
import CartPage from 'pages/shop/Cart.page'
import CheckoutPage from 'pages/shop/Checkout.page'
import PaymentResultPage from 'pages/shop/PaymentResult.page'
import NotFoundPage from 'pages/NotFound.page'

const ShopRoute = () => {
    return (
        <Switch>
            <Route path='/shop/products/:category' component={ProductsPage} />
            <Route path='/shop/product/:id' component={ProductPage} />
            <Route path='/shop/cart' component={CartPage} />
            <Route path='/shop/checkout' component={CheckoutPage} />
            <Route path='/shop/payment-result' component={PaymentResultPage} />
            <Route component={NotFoundPage}></Route>
        </Switch>
    )
}

export default ShopRoute