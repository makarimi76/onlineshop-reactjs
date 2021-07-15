import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getOrders, startOrderLoading } from 'redux/actions/admin/order.action'

// Components
import AdminLayout from 'layout/admin/Admin.layout'
import Table from 'components/Table'
import ManageOrder from 'pages/admin/components/ManageOrder'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

import { IoMdCheckbox } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    topMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        border: '1px solid #bdbdbd',
        width: theme.spacing(12),
        height: theme.spacing(12)
    }
}))

const OrdersPage = ({ getOrders, startOrderLoading, order: { orders, totalCount, loading } }) => {

    const classes = useStyles()

    const columns = [
        {
            id: 'customer',
            label: 'نام مشتری'
        },
        {
            id: 'totalPrice',
            label: 'مجموع قیمت'
        },
        {
            id: 'orderTime',
            label: 'زمان ثبت سفارش'
        },
        {
            id: 'action',
            label: 'عملیات'
        }
    ]

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [orderStatus, setOrderStatus] = useState('total')

    // Get Orders
    useEffect(() => {
        startOrderLoading()
        getOrders(orderStatus, page, rowsPerPage)
    }, [startOrderLoading, getOrders, orderStatus, page, rowsPerPage])

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value)
    }

    const [manageOrder, setManageOrder] = useState({
        open: false,
        id: undefined
    })

    const handleManageOrder = (id) => {
        setManageOrder({ open: true, id })
    }

    return (
        <AdminLayout>
            {manageOrder.open && <ManageOrder options={manageOrder} setOptions={setManageOrder} />}

            <div className={classes.topMenu}>
                <Typography variant="h6">مدیریت سفارش ها</Typography>
                <RadioGroup row name="orderStatus" value={orderStatus} onChange={handleOrderStatusChange}>
                    <FormControlLabel value="total" control={<Radio color="primary" />} label="همه سفارش ها" />
                    <FormControlLabel value="delivered" control={<Radio color="primary" />} label="سفارش های تحویل شده" />
                    <FormControlLabel value="waiting" control={<Radio color="primary" />} label="سفارش های در انتظار ارسال" />

                </RadioGroup>
            </div>

            {loading ? <div className={classes.spinner}><CircularProgress /></div> :
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

                        body={orders.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left" style={{ width: "30%" }} size='small'>{row.name} {row.familyName}</TableCell>
                                <TableCell align="left" style={{ width: "25%" }}>
                                    {row.orderList.map((order) => Number(order.price * order.quantity)).reduce((a, b) => a + b, 0)} تومان
                                </TableCell>
                                <TableCell align="left" style={{ width: "25%" }}>{Date(row.createdAt).slice(3, 25)}</TableCell>
                                <TableCell align="left" style={{ width: "20%" }}>
                                    <Button
                                        color="secondary"
                                        startIcon={<IoMdCheckbox />}
                                        onClick={() => handleManageOrder(row.id)}
                                    >بررسی سفارش</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        pagination={
                            {
                                rowsPerPageOptions: [5, 10, 15, 25],
                                totalCount,
                                page,
                                rowsPerPage,
                                handleChangePage,
                                handleChangeRowsPerPage
                            }
                        }

                    />
                </Paper>
            }
        </AdminLayout>
    )
}

const mapStateToProps = ({ admin }) => ({
    order: admin.order
})

export default connect(mapStateToProps, {
    getOrders, startOrderLoading
})(OrdersPage)