import {
    INITIAL_CATEGORIZED_PRODUCTS,
    GET_CATEGORIZED_PRODUCTS,
    START_PRODUCT_LOADING,
    PRODUCT_ERROR
} from 'redux/actions/shop/types'

const initialState = {
    categorizedProducts: {},
    limitCategorizedProducts: 10,
    loading: true,
    error: null
}

export default function product(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case INITIAL_CATEGORIZED_PRODUCTS: {
            const initCategorizedProducts = {}
            payload.forEach(item => {
                if (item.isShowHome)
                    Object.assign(initCategorizedProducts, { [item.slug]: [] })
            })
            return {
                ...state,
                categorizedProducts: { ...initCategorizedProducts }
            }
        }
        case GET_CATEGORIZED_PRODUCTS:
            return {
                ...state,
                categorizedProducts: { ...state.categorizedProducts, [payload.slug]: payload.data },
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