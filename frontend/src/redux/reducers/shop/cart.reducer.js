import {
    ADD_CART,
    UPDATE_CART,
    REMOVE_CART
} from 'redux/actions/shop/types'

const initialState = {
    carts: []
}

export default function cart(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_CART:
            return {
                ...state,
                carts: [
                    ...state.carts,
                    payload
                ]
            }
        case UPDATE_CART:
            return {
                ...state,
                carts: [
                    ...state.carts.slice(0, payload.index),
                    Object.assign(state.carts[payload.index], payload.item),
                    ...state.carts.slice(payload.index + 1)
                ]
            }
        case REMOVE_CART:
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