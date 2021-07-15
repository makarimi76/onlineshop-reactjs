import {
    NEW_ORDER_SHOP,
    GET_ORDER_SHOP,
    UPDATE_ORDER_SHOP,
    ORDER_ERROR_SHOP
} from 'redux/actions/shop/types'

const initialState = {
    newOrder: null,
    order: null,
    loading: true,
    error: null
}

export default function order(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case NEW_ORDER_SHOP:
            return {
                ...state,
                newOrder: payload
            }
        case GET_ORDER_SHOP:
            return {
                ...state,
                order: payload,
                loading: false
            }
        case UPDATE_ORDER_SHOP:
            return {
                ...state
            }
        case ORDER_ERROR_SHOP:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}