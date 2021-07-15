import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Redux
import { getOrder } from 'redux/actions/admin/order.action'

// Components
import Table from 'components/Table'

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
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { IoMdClose } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2)
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
    action: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    },
    button: {
        height: 46,
        padding: theme.spacing(0, 4),
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
}))

const ManageOrder = ({ options: { open, id }, setOptions, order: { order }, getOrder }) => {

    const theme = useTheme()
    const classes = useStyles()

    const columns = [
        {
            id: 'name',
            label: 'نام کالا'
        },
        {
            id: 'price',
            label: 'قیمت'
        },
        {
            id: 'quantity',
            label: 'تعداد'
        },
    ]

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

                {!order ? <div className={classes.spinner}><CircularProgress /></div> :
                    <>
                        <DialogContent dir="rtl" className={classes.content}>
                            <Typography variant="subtitle1">نام مشتری: {order.name} {order.familyName}</Typography>
                            <Typography variant="subtitle1">آدرس: {order.address}</Typography>
                            <Typography variant="subtitle1">تلفن: {order.phone}</Typography>
                            <Typography variant="subtitle1">زمان ثبت سفارش: {Date(order.createdAt).slice(3, 25)}</Typography>
                            <Typography variant="subtitle1">زمان انتخابی ارسال: {order.shippingTime}</Typography>

                            <Paper elevation={3} className={classes.root}>
                                <Table
                                    head={
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    }

                                    body={
                                        order.orderList.map(row => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left" style={{ width: "50%" }} size='small'>{row.name}</TableCell>
                                                <TableCell align="left" style={{ width: "30%" }} size='small'>{row.price}</TableCell>
                                                <TableCell align="left" style={{ width: "25%" }} size='small'>{row.quantity}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                />
                            </Paper>
                        </DialogContent>

                        <DialogActions className={classes.action} >
                            {order.isDelivery === "true" ?
                                (
                                    <Typography variant="subtitle1">این سفارش در تاریخ {order.deliveryTime} تحویل شده است</Typography>
                                ) :
                                (
                                    <Button onClick={handleSubmit} variant="contained" className={classes.button} size="large">
                                        تحویل شد
                                    </Button>
                                )
                            }
                        </DialogActions>
                    </>
                }

            </Dialog>
        </>
    )
}

const mapStateToProps = ({ admin }) => ({
    order: admin.order
})

export default connect(mapStateToProps, { getOrder })(ManageOrder)