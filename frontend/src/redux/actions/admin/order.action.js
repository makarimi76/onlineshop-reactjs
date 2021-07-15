import axiosInstance from 'utils/axios'

import {
    GET_ORDERS,
    GET_ORDER,
    START_ORDER_LOADING,
    ORDER_ERROR
} from "redux/actions/admin/types"

// Get Orders
export const getOrders = (orderStatus, page, rowsPerPage) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/orders?` +
            (orderStatus === 'waiting' ? 'isDelivery=false&' : orderStatus === 'delivered' ? 'isDelivery=true&' : '') +
            `_page=${page + 1}&_limit=${rowsPerPage}`)

        dispatch({
            type: GET_ORDERS,
            payload: {
                orders: res.data, totalCount: +res.headers['x-total-count']
            }
        })

    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: err
        })
    }
}

// Get Order
export const getOrder = id => async dispatch => {
    try {
        const res = await axiosInstance.get(`/orders/${id}`)

        dispatch({
            type: GET_ORDER,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: err
        })
    }
}

// Start Loading
export const startOrderLoading = () => dispatch => {
    dispatch({
        type: START_ORDER_LOADING
    })
}