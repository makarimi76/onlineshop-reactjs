import { combineReducers } from "redux"

import product from 'redux/reducers/shop/product.reducer'
import category from 'redux/reducers/shop/category.reducer'

export default combineReducers({
    product,
    category
})