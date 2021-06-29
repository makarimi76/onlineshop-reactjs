import axios from 'axios'

import {
    GET_PRODUCTS,
    GET_ORDERS,
    START_LOADING,
    ADMIN_ERROR
} from "redux/actions/admin/type.action"

// Get Products
export const getProducts = (page, rowsPerPage) => async dispatch => {
    try {
        const res = await axios.get(`/products?_page=${page + 1}&_limit=${rowsPerPage}`)

        dispatch({
            type: GET_PRODUCTS,
            payload: {
                products: res.data, totalCount: +res.headers['x-total-count']
            }
        })

    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: err
        })
    }
}

// Get Orders
export const getOrders = (orderStatus, page, rowsPerPage) => async dispatch => {
    try {
        const res = await axios.get(`/orders?` +
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
            type: ADMIN_ERROR,
            payload: err
        })
    }
}

// Start Loading
export const startLoading = () => dispatch => {
    dispatch({
        type: START_LOADING
    })
}