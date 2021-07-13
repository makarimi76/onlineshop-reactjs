import {
    INITIAL_CATEGORIZED_PRODUCTS_SHOP,
    GET_CATEGORIZED_PRODUCTS_SHOP,
    GET_PRODUCTS_BY_CATEGORY_SHOP,
    GET_PRODUCT_SHOP,
    START_PRODUCT_LOADING_SHOP,
    PRODUCT_ERROR_SHOP
} from 'redux/actions/shop/types'

const initialState = {
    categorizedProducts: {},
    products: [],
    product: null,
    limitCategorizedProducts: 10,
    loading: true,
    productLoading: true,
    getProducts: false,
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
                categorizedProducts: { ...initCategorizedProducts },
                getProducts: true
            }
        }
        case GET_CATEGORIZED_PRODUCTS_SHOP:
            return {
                ...state,
                categorizedProducts: { ...state.categorizedProducts, [payload.slug]: payload.data },
                loading: false
            }
        case GET_PRODUCTS_BY_CATEGORY_SHOP:
            return {
                ...state,
                products: payload,
                loading: false
            }
        case GET_PRODUCT_SHOP:
            return {
                ...state,
                product: payload,
                loading: false,
                productLoading: false,
            }
        case START_PRODUCT_LOADING_SHOP:
            return {
                ...state,
                loading: true,
                productLoading: true,
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