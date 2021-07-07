import { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const EditText = ({ id, type, itemValue, isChanged }) => {

    const [input, setInput] = useState(itemValue)
    const [mode, setMode] = useState('text')

    const handelClick = (action) => {
        setMode(action)
    }

    const handelChange = ({ target: { name, value } }) => {
        setInput(value)
        isChanged(id, { [name]: value })
    }

    return (
        <>
            {mode === 'text' ?
                <Button
                    onClick={() => handelClick('edit')}
                    size="large"
                    fullWidth
                >
                    {input}
                </Button>
                :
                <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onChange={handelChange}
                    name={type}
                    {...(itemValue === input && { onBlur: () => handelClick('text') })}
                    value={input}
                    autoFocus />
            }
        </>
    )
}

export default EditText