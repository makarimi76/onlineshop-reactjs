import {
    GET_PRODUCTS,
    START_LOADING,
    ADMIN_ERROR
} from 'redux/actions/admin/type.action'

const initialState = {
    products: [],
    totalCount: null,
    loading: true,
    error: null
}

export default function admin(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                totalCount: payload.totalCount,
                loading: false
            }
        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADMIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}