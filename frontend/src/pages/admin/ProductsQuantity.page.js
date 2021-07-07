import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getProducts, startLoading, updateProductsQuantity } from 'redux/actions/admin/admin.action'

// Components
import RouterLink from 'components/RouterLink'
import AdminLayout from 'layout/admin/Admin.layout'
import AdminTable from 'pages/admin/components/AdminTable'
import EditText from 'pages/admin/components/EditText'

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

const ProductQuantityPage = ({ getProducts, startLoading, updateProductsQuantity, admin: { products, totalCount, loading } }) => {

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
            let { id, name, price, quantity } = item
            return setRows(rows => [...rows, { id, name, price, quantity }])
        })
    }, [products])

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    // If Price or Quantity changed
    const [changedRows, setChangedRows] = useState([])

    const isChanged = (changedId, changedItem) => {
        const index = changedRows.findIndex(item => item.id === changedId)
        if (index !== -1) {
            if (JSON.stringify(Object.assign(changedRows[index], changedItem)) === JSON.stringify(rows.find(item => item.id === changedId)))
                setChangedRows([
                    ...changedRows.slice(0, index),
                    ...changedRows.slice(index + 1)
                ])
            else
                setChangedRows([
                    ...changedRows.slice(0, index),
                    Object.assign(changedRows[index], changedItem),
                    ...changedRows.slice(index + 1)
                ])
        } else {
            setChangedRows([
                ...changedRows,
                Object.assign({ ...rows.find(item => item.id === changedId) }, changedItem),
            ])
        }
    }

    const handleSaveClick = () => {
        if (changedRows.length !== 0)
            console.log(changedRows)
    }

    return (
        <AdminLayout>
            <div className={classes.topMenu}>
                <Typography variant="h6">مدیریت موجودی و قیمت ها</Typography>
                <Button variant="contained" color="secondary" onClick={handleSaveClick}>ذخیره</Button>
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
                                    <EditText id={row.id} type="price" itemValue={row.price} isChanged={isChanged} />
                                </TableCell>
                                <TableCell align="left" style={{ width: "20%" }}>
                                    <EditText id={row.id} type="quantity" itemValue={row.quantity} isChanged={isChanged} />
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
    getProducts, startLoading, updateProductsQuantity
})(ProductQuantityPage)