import {
    GET_ORDERS,
    GET_ORDER,
    UPDATE_ORDER,
    START_ORDER_LOADING,
    ORDER_ERROR
} from 'redux/actions/admin/types'

const initialState = {
    orders: [],
    order: null,
    totalCount: null,
    loading: true,
    error: null
}

export default function order(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: payload.orders,
                totalCount: payload.totalCount,
                loading: false
            }
        case GET_ORDER:
            return {
                ...state,
                order: payload,
                loading: false
            }
        case UPDATE_ORDER:
            return {
                ...state,
                order: payload,
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