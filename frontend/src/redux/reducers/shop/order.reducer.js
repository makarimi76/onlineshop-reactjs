import {
    NEW_ORDER_SHOP,
    ORDER_ERROR_SHOP
} from 'redux/actions/shop/types'

const initialState = {
    newOrder: null,
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
        case ORDER_ERROR_SHOP:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}