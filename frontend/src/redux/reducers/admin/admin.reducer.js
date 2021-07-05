import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    GET_ORDERS,
    GET_CATEGORIES,
    START_LOADING,
    START_MODAL_LOADING,
    ADMIN_ERROR
} from 'redux/actions/admin/types'

const initialState = {
    products: [],
    product: null,
    newProduct: null,
    orders: [],
    categories: [],
    totalCount: null,
    loading: true,
    modalLoading: true,
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
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
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
                categories: payload,
                modalLoading: false
            }
        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        case START_MODAL_LOADING:
            return {
                ...state,
                modalLoading: true
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