
import axiosInstance from 'utils/axios'
import { jsonToFormData } from 'utils/jsonToFormData'

import {
    NEW_ORDER_SHOP,
    ORDER_ERROR_SHOP
} from 'redux/actions/shop/types'

// Add Order
export const addOrder = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    const body = await jsonToFormData(formData)

    try {
        const res = await axiosInstance.post('/orders', body, config)

        dispatch({
            type: NEW_ORDER_SHOP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ORDER_ERROR_SHOP,
            payload: err
        })
    }
}