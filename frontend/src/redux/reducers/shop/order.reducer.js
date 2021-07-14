import {

} from 'redux/actions/shop/types'

const initialState = {
    order: []
}

export default function order(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        default:
            return state
    }
}