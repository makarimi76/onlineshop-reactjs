
import axiosInstance from 'utils/axios'
import { jsonToFormData } from 'utils/jsonToFormData'

// Add Order
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