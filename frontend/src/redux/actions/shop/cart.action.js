import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_TO_CART,
    REMOVE_PRODUCT_TO_CART
} from "redux/actions/shop/types"

// Add Changed Product
export const addChangedProduct = (id, item) => dispatch => {
    dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: { id, item }
    })
}

//Update Changed Product
export const updateChangedProduct = (id, item, index) => dispatch => {
    dispatch({
        type: UPDATE_PRODUCT_TO_CART,
        payload: { id, item, index }
    })
}

//Remove Changed Product
export const removeChangedProduct = (index) => dispatch => {
    dispatch({
        type: REMOVE_PRODUCT_TO_CART,
        payload: index
    })
}
