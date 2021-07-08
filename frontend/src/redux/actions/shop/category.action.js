import axios from 'axios'

import {
    GET_CATEGORIES_SHOP,
    START_CATEGORY_LOADING_SHOP,
    CATEGORY_ERROR_SHOP,
    INITIAL_CATEGORIZED_PRODUCTS_SHOP

} from "redux/actions/shop/types"

// Get Categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/categories')

        dispatch({
            type: GET_CATEGORIES_SHOP,
            payload: res.data
        })

        dispatch({
            type: INITIAL_CATEGORIZED_PRODUCTS_SHOP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR_SHOP,
            payload: err
        })
    }
}

// Start Loading
export const startCategoryLoading = () => dispatch => {
    dispatch({
        type: START_CATEGORY_LOADING_SHOP
    })
}