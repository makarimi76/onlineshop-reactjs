import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { SnackbarProvider } from 'notistack'
import Zoom from '@material-ui/core/Zoom'
import IconButton from '@material-ui/core/IconButton'

import { IoMdClose } from 'react-icons/io'

const Toast = ({ children, alert }) => {

    const notistackRef = useRef()

    useEffect(() => {
        if (Object.keys(alert).length !== 0) {
            notistackRef.current.enqueueSnackbar(
                alert.msg,
                {
                    variant: alert.type,
                }
            )
        }
    }, [alert])

    const handleClose = key => () => {
        notistackRef.current.closeSnackbar(key)
    }

    return (
        <SnackbarProvider
            ref={notistackRef}
            maxSnack={5}
            TransitionComponent={Zoom}
            action={(key) => (
                <IconButton color="inherit" onClick={handleClose(key)}>
                    <IoMdClose />
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    )
}

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps)(Toast)