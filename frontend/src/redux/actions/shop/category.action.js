import axios from 'axios'

import {
    GET_CATEGORIES,
    START_CATEGORY_LOADING,
    CATEGORY_ERROR,
    INITIAL_CATEGORIZED_PRODUCTS

} from "redux/actions/shop/types"

// Get Categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/categories')

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })

        dispatch({
            type: INITIAL_CATEGORIZED_PRODUCTS,
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