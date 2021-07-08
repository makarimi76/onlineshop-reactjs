import {
    GET_CATEGORIES_SHOP,
    START_CATEGORY_LOADING_SHOP,
    SET_CATEGORY_NAME_SHOP,
    CATEGORY_ERROR_SHOP
} from 'redux/actions/shop/types'

const initialState = {
    categories: [],
    categoryName: '',
    loading: true,
    error: null
}

export default function category(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_CATEGORIES_SHOP:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case START_CATEGORY_LOADING_SHOP:
            return {
                ...state,
                loading: true
            }
        case SET_CATEGORY_NAME_SHOP:
            return {
                ...state,
                categoryName: payload

            }
        case CATEGORY_ERROR_SHOP:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}