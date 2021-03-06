import axiosInstance from 'utils/axios'
import { jsonToFormData } from 'utils/jsonToFormData'
import { setAlert } from 'redux/actions/alert.action'

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    NEW_PRODUCT,
    ADD_CHANGED_PRODUCT,
    UPDATE_CHANGED_PRODUCT,
    REMOVE_CHANGED_PRODUCT,
    SER_RETRIEVE_PRODUCTS,
    START_PRODUCT_LOADING,
    PRODUCT_ERROR
} from "redux/actions/admin/types"

// Get Products
export const getProducts = (page, rowsPerPage) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/products?_page=${page + 1}&_limit=${rowsPerPage}`)

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
        const res = await axiosInstance.get(`/products/${id}`)

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

    const body = jsonToFormData(formData)

    try {
        const res = await axiosInstance.post('/products', body, config)

        dispatch({
            type: NEW_PRODUCT,
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

// Update Product
export const updateProduct = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    const body = jsonToFormData(formData)

    try {
        const res = await axiosInstance.patch(`/products/${formData.id}`, body, config)

        dispatch({
            type: NEW_PRODUCT,
            payload: res.data
        })

        dispatch(setAlert(`کالا ${res.data.id} با موفقیت بروزرسانی شد`, 'success'))

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err
        })
    }
}

// Remove Product
export const removeProduct = id => async dispatch => {

    try {
        const res = await axiosInstance.delete(`/products/${id}`)

        dispatch({
            type: NEW_PRODUCT,
            payload: res.data
        })

        dispatch(setAlert(`کالا ${id} با موفقیت حذف شد`, 'danger'))

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

//Set Retrieve Product
export const setRetrieveProducts = (retrieveProducts) => dispatch => {
    dispatch({
        type: SER_RETRIEVE_PRODUCTS,
        payload: retrieveProducts
    })
}


// Start Loading
export const startLoading = () => dispatch => {
    dispatch({
        type: START_PRODUCT_LOADING
    })
}