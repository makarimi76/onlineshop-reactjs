
import axiosInstance from 'utils/axios'
import { jsonToFormData } from 'utils/jsonToFormData'

import {
    NEW_ORDER_SHOP,
    GET_ORDER_SHOP,
    UPDATE_ORDER_SHOP,
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

// Get Order
export const getOrder = id => async dispatch => {
    try {
        const res = await axiosInstance.get(`/orders/${id}`)

        dispatch({
            type: GET_ORDER_SHOP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ORDER_ERROR_SHOP,
            payload: err
        })
    }
}

// Update Order
export const updateOrder = (formData, result) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    const body = await jsonToFormData({ ...formData, idPaid: result })

    try {
        const res = await axiosInstance.patch(`/orders/${formData.id}`, body, config)

        dispatch({
            type: UPDATE_ORDER_SHOP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ORDER_ERROR_SHOP,
            payload: err
        })
    }
}