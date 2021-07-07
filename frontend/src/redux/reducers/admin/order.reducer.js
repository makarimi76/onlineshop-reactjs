import {
    GET_ORDERS,
    START_ORDER_LOADING,
    ORDER_ERROR
} from 'redux/actions/admin/types'

const initialState = {
    orders: [],
    totalCount: null,
    loading: true,
    error: null
}

export default function product(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: payload.orders,
                totalCount: payload.totalCount,
                loading: false
            }
        case START_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        case ORDER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}