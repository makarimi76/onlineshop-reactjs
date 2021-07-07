import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    START_PRODUCT_LOADING,
    PRODUCT_ERROR
} from 'redux/actions/admin/types'

const initialState = {
    products: [],
    product: null,
    newProduct: null,
    categories: [],
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