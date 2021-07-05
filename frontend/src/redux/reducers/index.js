import { combineReducers } from "redux"

import admin from 'redux/reducers/admin/admin.reducer'
import alert from 'redux/reducers/alert.reducer'

export default combineReducers({
    admin,
    alert
})