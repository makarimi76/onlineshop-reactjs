import axiosInstance from "utils/axios"

import {
    GET_CATEGORIZED_PRODUCTS,
    START_PRODUCT_LOADING,
    PRODUCT_ERROR
} from "redux/actions/shop/types"

// Get Categories
export const getCategorizedProducts = (name, slug, limit) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/products?categories_like=${name}&_limit=${limit}`)

        dispatch({
            type: GET_CATEGORIZED_PRODUCTS,
            payload: { data: res.data, slug }
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err
        })
    }
}
