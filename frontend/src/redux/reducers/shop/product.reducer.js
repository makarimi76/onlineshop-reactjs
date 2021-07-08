import {
    INITIAL_CATEGORIZED_PRODUCTS_SHOP,
    GET_CATEGORIZED_PRODUCTS_SHOP,
    START_PRODUCT_LOADING_SHOP,
    PRODUCT_ERROR_SHOP
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
        case INITIAL_CATEGORIZED_PRODUCTS_SHOP: {
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
        case GET_CATEGORIZED_PRODUCTS_SHOP:
            return {
                ...state,
                categorizedProducts: { ...state.categorizedProducts, [payload.slug]: payload.data },
                loading: false
            }
        case START_PRODUCT_LOADING_SHOP:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ERROR_SHOP:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}