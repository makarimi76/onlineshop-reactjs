import axios from 'axios'
import { setAlert } from 'redux/actions/alert.action'

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    ADD_CHANGED_PRODUCT,
    UPDATE_CHANGED_PRODUCT,
    REMOVE_CHANGED_PRODUCT,
    START_PRODUCT_LOADING,
    PRODUCT_ERROR
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
            type: PRODUCT_ERROR,
            payload: err
        })
    }
}

// Get Product
export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`/products/${id}`)

        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
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
            type: PRODUCT_ERROR,
            payload: err
        })
    }
}

// Add Changed Product
export const addChangedProduct = (id, item) => dispatch => {
    dispatch({
        type: ADD_CHANGED_PRODUCT,
        payload: { id, item }
    })
}

//Update Changed Product
export const updateChangedProduct = (id, item, index) => dispatch => {
    dispatch({
        type: UPDATE_CHANGED_PRODUCT,
        payload: { id, item, index }
    })
}

//Remove Changed Product
export const removeChangedProduct = (index) => dispatch => {
    dispatch({
        type: REMOVE_CHANGED_PRODUCT,
        payload: index
    })
}

// Update Products Quantity
export const updateProductsQuantity = changedData => async dispatch => {

    console.log(changedData)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    changedData.forEach(async item => {
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
                type: PRODUCT_ERROR,
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
    //         type: PRODUCT_ERROR,
    //         payload: err
    //     })
    // }
}

// Start Loading
export const startLoading = () => dispatch => {
    dispatch({
        type: START_PRODUCT_LOADING
    })
}