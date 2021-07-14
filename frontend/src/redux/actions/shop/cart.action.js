
import axiosInstance from 'utils/axios'
import { jsonToFormData } from 'utils/jsonToFormData'
import { setAlert } from 'redux/actions/alert.action'

import {
    ADD_CART,
    UPDATE_CART,
    REMOVE_CART
} from "redux/actions/shop/types"

// Add Product to Carts
export const addCart = (cart) => dispatch => {
    dispatch({
        type: ADD_CART,
        payload: cart
    })

    dispatch(setAlert(`کالا به تعداد ${cart.quantity} عدد به سبد خرید افزوده شد`, 'success'))
}

//Update Product from Carts
export const updateCart = (index, item) => dispatch => {
    dispatch({
        type: UPDATE_CART,
        payload: { index, item }
    })

    dispatch(setAlert(`تعداد کالا در سبد خرید به ${item.quantity} عدد تغییر یافت`, 'success'))
}

//Remove Product from Carts
export const removeCart = (index) => dispatch => {
    dispatch({
        type: REMOVE_CART,
        payload: index
    })

    dispatch(setAlert('کالا از سبد خرید حذف شد', 'success'))
}

// Add Product
export const addOrder = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
    }

    const body = await jsonToFormData(formData)

    try {
        const res = await axiosInstance.post('/orders', body, config)

        console.log(res.data)
        // dispatch({
        //     type: NEW_PRODUCT,
        //     payload: res.data
        // })

        dispatch(setAlert(`کالا ${res.data.id} با موفقیت اضافه شد`, 'success'))

    } catch (err) {
        // dispatch({
        //     type: PRODUCT_ERROR,
        //     payload: err
        // })
    }
}