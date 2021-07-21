import axiosInstance from 'utils/axios'

import {
    GET_CATEGORIES,
    START_CATEGORY_LOADING,
    CATEGORY_ERROR
} from "redux/actions/admin/types"

// Get Categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/categories')

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: err
        })
    }
}

// Start Loading
export const startCategoryLoading = () => dispatch => {
    dispatch({
        type: START_CATEGORY_LOADING
    })
}