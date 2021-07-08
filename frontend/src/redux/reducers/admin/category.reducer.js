import {
    GET_CATEGORIES,
    START_CATEGORY_LOADING,
    CATEGORY_ERROR
} from 'redux/actions/admin/types'

const initialState = {
    categories: [],
    loading: true,
    error: null
}

export default function category(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case START_CATEGORY_LOADING:
            return {
                ...state,
                loading: true
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}