import { combineReducers } from "redux"

import admin from 'redux/reducers/admin'
import shop from 'redux/reducers/shop'
import alert from 'redux/reducers/alert.reducer'

export default combineReducers({
    admin,
    shop,
    alert
})