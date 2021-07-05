import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    GET_ORDERS,
    GET_CATEGORIES,
    START_LOADING,
    ADMIN_ERROR
} from 'redux/actions/admin/type.action'

const initialState = {
    products: [],
    newProduct: null,
    orders: [],
    categories: [],
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
        case ADD_PRODUCT:
            return {
                ...state,
                newProduct: payload,
                loading: false
            }
        case GET_ORDERS:
            return {
                ...state,
                orders: payload.orders,
                totalCount: payload.totalCount,
                loading: false
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
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