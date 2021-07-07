import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    ADD_CHANGED_PRODUCT,
    UPDATE_CHANGED_PRODUCT,
    REMOVE_CHANGED_PRODUCT,
    START_PRODUCT_LOADING,
    PRODUCT_ERROR
} from 'redux/actions/admin/types'

const initialState = {
    products: [],
    product: null,
    changedProducts: [],
    newProduct: null,
    totalCount: null,
    loading: true,
    error: null
}

export default function product(state = initialState, action) {
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
        case ADD_CHANGED_PRODUCT:
            return {
                ...state,
                changedProducts: [
                    ...state.changedProducts,
                    Object.assign({ ...state.products.find(item => item.id === payload.id) }, payload.item)
                ]
            }
        case UPDATE_CHANGED_PRODUCT:
            return {
                ...state,
                changedProducts: [
                    ...state.changedProducts.slice(0, payload.index),
                    Object.assign(state.changedProducts[payload.index], payload.item),
                    ...state.changedProducts.slice(payload.index + 1)
                ]
            }
        case REMOVE_CHANGED_PRODUCT:
            return {
                ...state,
                changedProducts: [
                    ...state.changedProducts.slice(0, payload),
                    ...state.changedProducts.slice(payload + 1)
                ]
            }
        case START_PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}