import { Route, Switch } from 'react-router-dom'

import ProductsPage from 'pages/admin/products/Products.page'
import ProductsQuantityPage from 'pages/admin/products-quantity/ProductsQuantity.page'
import OrdersPage from 'pages/admin/orders/Orders.page'
import LoginPage from 'pages/admin/Login.page'
import NotFoundPage from 'pages/NotFound.page'

const AdminRoute = () => {
    console.log('Admin Route')
    return (
        <Switch>
            <Route exact path='/admin' component={ProductsPage} />
            <Route exact path='/admin/products' component={ProductsPage} />
            <Route path='/admin/quantity' component={ProductsQuantityPage} />
            <Route path='/admin/orders' component={OrdersPage} />
            <Route path='/admin/login' component={LoginPage} />
            <Route component={NotFoundPage}></Route>
        </Switch>
    )
}

export default AdminRoute