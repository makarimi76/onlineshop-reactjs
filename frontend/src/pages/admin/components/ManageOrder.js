import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Redux
import { getOrder } from 'redux/actions/admin/order.action'

// UI
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'

import { IoMdClose } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        overflowX: 'hidden'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    upload: {
        display: 'flex'
    },
    uploadPath: {
        flex: 1
    },
    uploadButton: {
        height: 56,
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 8
    }
}))

const ManageOrder = ({ options: { open, id }, setOptions, order: { order, loading }, getOrder }) => {

    const theme = useTheme()
    const classes = useStyles()

    useEffect(() => {
        getOrder(id)
    }, [id])

    const handleClose = () => {
        setOptions({
            open: false,
            id: undefined
        })
    }

    const handleSubmit = () => {
        console.log(1)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth={'sm'}
                scroll={'paper'}
                fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
            >
                <DialogTitle className={classes.title} disableTypography  >
                    <IconButton onClick={handleClose}>
                        <IoMdClose />
                    </IconButton>
                    <Typography variant="h6">نمایش سفارش</Typography>
                </DialogTitle>

                <DialogContent dir="rtl" dividers className={classes.content}>
                    {loading ? <div className={classes.spinner}><CircularProgress /></div> :
                        <>
                            Content
                        </>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" color="secondary" size="large">
                        ذخیره
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

const mapStateToProps = ({ admin }) => ({
    order: admin.order
})

export default connect(mapStateToProps, { getOrder })(ManageOrder)