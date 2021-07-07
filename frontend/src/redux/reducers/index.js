import { combineReducers } from "redux"

import admin from 'redux/reducers/admin'
import alert from 'redux/reducers/alert.reducer'

export default combineReducers({
    admin,
    alert
})