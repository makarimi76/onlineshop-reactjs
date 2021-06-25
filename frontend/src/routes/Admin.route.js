import { Route, Switch } from 'react-router-dom'

import ProductsPage from 'pages/admin/Products.page'
import ProductsQuantityPage from 'pages/admin/ProductsQuantity.page'
import OrdersPage from 'pages/admin/Orders.page'
import LoginPage from 'pages/admin/Login.page'
import NotFoundPage from 'pages/NotFound.page'

const AdminRoute = () => {
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