import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const Toast = ({ alerts }) => {

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setOpen(true)
    }, [alerts])

    return (alerts.length > 0 &&
        alerts.map(alert => (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
            >
                <Alert onClose={handleClose} severity={alert.type} >
                    {alert.msg}
                </Alert>
            </Snackbar>
        )))
}

const mapStateToProps = state => ({
    alerts: state.admin
});

export default connect(mapStateToProps)(Toast);