import axios from 'axios'
import { setAlert } from 'redux/actions/alert.action'

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    GET_ORDERS,
    GET_CATEGORIES,
    START_LOADING,
    START_MODAL_LOADING,
    ADMIN_ERROR
} from "redux/actions/admin/types"

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


// Get Product
export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`/products?id=${id}`)

        dispatch({
            type: GET_PRODUCT,
            payload: res.data[0]
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
        const res = await axios.post('/products', body, config)

        console.log(res)
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })

        dispatch(setAlert(`کالا ${res.data.id} با موفقیت اضافه شد`, 'success'))

    } catch (err) {

        dispatch({
            type: ADMIN_ERROR,
            payload: err
        })
    }
}

// Update Products Quantity
export const updateProductsQuantity = changedData => async dispatch => {

    console.log(changedData)
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    await changedData.forEach(async item => {
        const body = new FormData()
        Object.keys(item).forEach(key => {
            if (key === 'categories') {
                item.categories.forEach((item) => body.append(key, item))
            } else {
                body.append(key, item[key])
            }
        })

        try {
            const res = await axios.patch(`/products/${item.id}`, body, config)

            console.log(res)
            // dispatch({
            //     type: ADD_PRODUCT,
            //     payload: res.data
            // })

            // dispatch(setAlert(`کالا ${res.data.id} با موفقیت اضافه شد`, 'success'))

        } catch (err) {

            dispatch({
                type: ADMIN_ERROR,
                payload: err
            })
        }
    })

    console.log(changedData)

    // const body = new FormData()

    // Object.keys(formData).forEach(key => {
    //     if (key === 'categories') {
    //         formData.categories.forEach((item) => body.append(key, item))
    //     } else {
    //         body.append(key, formData[key])
    //     }
    // })

    // try {
    //     const res = await axios.post('/products', body, config)

    //     console.log(res)
    //     dispatch({
    //         type: ADD_PRODUCT,
    //         payload: res.data
    //     })

    //     dispatch(setAlert(`کالا ${res.data.id} با موفقیت اضافه شد`, 'success'))

    // } catch (err) {

    //     dispatch({
    //         type: ADMIN_ERROR,
    //         payload: err
    //     })
    // }
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

// Start Modal Loading
export const startModalLoading = () => dispatch => {
    dispatch({
        type: START_MODAL_LOADING
    })
}