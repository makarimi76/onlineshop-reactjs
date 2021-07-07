import axios from 'axios'

import {
    GET_ORDERS,
    START_ORDER_LOADING,
    ORDER_ERROR
} from "redux/actions/admin/types"

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
            type: ORDER_ERROR,
            payload: err
        })
    }
}

// Start Loading
export const startLoading = () => dispatch => {
    dispatch({
        type: START_ORDER_LOADING
    })
}