import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_TO_CART,
    REMOVE_PRODUCT_TO_CART
} from 'redux/actions/shop/types'

const initialState = {
    carts: []
}

export default function cart(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                carts: [
                    ...state.carts,
                    payload
                ]
            }
        case UPDATE_PRODUCT_TO_CART:
            return {
                ...state,
                carts: [
                    ...state.carts.slice(0, payload.index),
                    payload,
                    ...state.carts.slice(payload.index + 1)
                ]
            }
        case REMOVE_PRODUCT_TO_CART:
            return {
                ...state,
                carts: [
                    ...state.carts.slice(0, payload),
                    ...state.carts.slice(payload + 1)
                ]
            }
        default:
            return state
    }
}