import axiosInstance from "utils/axios"

import {
    GET_CATEGORIZED_PRODUCTS_SHOP,
    GET_PRODUCTS_BY_CATEGORY_SHOP,
    GET_PRODUCT_SHOP,
    START_PRODUCT_LOADING_SHOP,
    PRODUCT_ERROR_SHOP
} from "redux/actions/shop/types"

// Get Categorized Products
export const getCategorizedProducts = (name, slug, limit) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/products?categories_like=${name}&_limit=${limit}`)

        dispatch({
            type: GET_CATEGORIZED_PRODUCTS_SHOP,
            payload: { data: res.data, slug }
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR_SHOP,
            payload: err
        })
    }
}

// Get Products By Category
export const getProductsByCategory = (name, page, limit) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/products?categories_like=${name}&_page=${page}&_limit=${limit}`)

        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY_SHOP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR_SHOP,
            payload: err
        })
    }
}

// Get Product
export const getProduct = (id) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/products/${id}`)

        dispatch({
            type: GET_PRODUCT_SHOP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR_SHOP,
            payload: err
        })
    }
}

// Start Loading
export const startProductLoading = () => dispatch => {
    dispatch({
        type: START_PRODUCT_LOADING_SHOP
    })
}

