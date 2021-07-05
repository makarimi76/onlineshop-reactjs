import { SET_ALERT } from 'redux/actions/types'

export const setAlert = (msg, type) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { msg, type }
    })
}