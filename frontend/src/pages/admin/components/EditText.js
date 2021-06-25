import { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const EditText = ({ value }) => {

    const [input, setInput] = useState(value)
    const [mode, setMode] = useState('text')

    const handelClick = (action) => {
        setMode(action)
    }

    const handelChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <>
            {mode === 'text' ?
                <Button
                    onClick={() => handelClick('edit')}
                    fullWidth
                    color={value !== input ? 'primary' : 'inherit'}
                >
                    {input}
                </Button>
                :
                <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onChange={handelChange}
                    onBlur={() => handelClick('text')}
                    value={input}
                    autoFocus />
            }
        </>
    )
}

export default EditText