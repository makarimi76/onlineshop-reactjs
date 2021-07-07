import { combineReducers } from "redux"

import product from 'redux/reducers/admin/product.reducer'
import order from 'redux/reducers/admin/order.reducer'
import category from 'redux/reducers/admin/category.reducer'

export default combineReducers({
    product,
    order,
    category
})