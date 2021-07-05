import axios from 'axios'

import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    GET_ORDERS,
    GET_CATEGORIES,
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

// Add Product
export const addProduct = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    const body = new FormData()

    Object.keys(formData).forEach(key => {
        if (key === 'categories') {
            formData.categories.forEach((item) => body.append(key, item))
        } else {
            body.append(key, formData[key])
        }
    })

    try {
        const res = await axios.post('/products', body, config);

        console.log(res)
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })

    } catch (err) {

        dispatch({
            type: ADMIN_ERROR,
            payload: err
        });
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

// Get Categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/categories')

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
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