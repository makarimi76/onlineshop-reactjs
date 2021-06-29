import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getProducts, startLoading } from 'redux/actions/admin/admin.action'

// Components
import AdminLayout from 'layout/admin/Admin.layout'
import AdminTable from 'pages/admin/components/AdminTable'
import EditText from 'pages/admin/components/EditText'
import RouterLink from 'components/RouterLink'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

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

const ProductQuantityPage = ({ getProducts, startLoading, admin: { products, totalCount, loading } }) => {

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
            label: 'موجودی'
        }
    ]

    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // Get Products
    useEffect(() => {
        startLoading()
        getProducts(page, rowsPerPage)
    }, [startLoading, getProducts, page, rowsPerPage])


    // Set Rows
    useEffect(() => {
        setRows([])
        products.map((item) => {
            let { id, image, name, categories } = item
            return setRows(rows => [...rows, { id, image, name, categories }])
        })
    }, [products])

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    return (
        <AdminLayout>
            <div className={classes.topMenu}>
                <Typography variant="h6">مدیریت موجودی و قیمت ها</Typography>
                <Button variant="contained" color="secondary">ذخیره</Button>
            </div>

            {loading ? <div className={classes.spinner}><CircularProgress /></div> :
                <Paper elevation={3} className={classes.root}>
                    <AdminTable
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

                        body={rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left" style={{ width: "60%" }} size='small'><RouterLink to={`/shop/product/${row.id}`} color="inherit">{row.name}</RouterLink></TableCell>
                                <TableCell align="left" style={{ width: "20%" }}>
                                    <EditText value={row.price} />
                                </TableCell>
                                <TableCell align="left" style={{ width: "20%" }}>
                                    <EditText value={row.quantity} />
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

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {
    getProducts, startLoading
})(ProductQuantityPage)