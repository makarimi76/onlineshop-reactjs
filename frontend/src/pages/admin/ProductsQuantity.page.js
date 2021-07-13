import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getProducts, startLoading, addChangedProduct, updateChangedProduct, removeChangedProduct, setRetrieveProducts, updateProduct } from 'redux/actions/admin/product.action'

// Components
import RouterLink from 'components/RouterLink'
import AdminLayout from 'layout/admin/Admin.layout'
import Table from 'components/Table'
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

const ProductQuantityPage = ({
    product: { products, totalCount, changedProducts, retrieveProducts, loading },
    getProducts, startLoading, addChangedProduct, updateChangedProduct, removeChangedProduct, setRetrieveProducts, updateProduct }) => {

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

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // Get Products
    useEffect(() => {
        startLoading()
        getProducts(page, rowsPerPage)
    }, [page, rowsPerPage])

    // Get Products When Saved Changes
    useEffect(() => {
        if (retrieveProducts) {
            startLoading()
            getProducts(page, rowsPerPage)
            setRetrieveProducts(false)
        }
    }, [retrieveProducts])

    // If Price or Quantity changed
    const isChanged = (changedId, changedItem) => {
        const changedProductIndex = changedProducts.findIndex(item => item.id === changedId)
        const productIndex = products.findIndex(item => item.id === changedId)

        if (changedProductIndex !== -1) {
            if (JSON.stringify(Object.assign(changedProducts[changedProductIndex], changedItem)) === JSON.stringify(products[productIndex]))
                removeChangedProduct(changedProductIndex)
            else
                updateChangedProduct(changedId, changedItem, changedProductIndex)
        } else {
            addChangedProduct(changedId, changedItem)
        }
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const handleSaveClick = () => {
        if (changedProducts.length !== 0)
            changedProducts.forEach(async (item, index, array) => {
                await updateProduct(item)
                removeChangedProduct(0)
                if (array.length - 1 === index)
                    setRetrieveProducts(true)
            })
    }

    return (
        <AdminLayout>
            <div className={classes.topMenu}>
                <Typography variant="h6">مدیریت موجودی و قیمت ها</Typography>
                <Button variant="contained" color="secondary" onClick={handleSaveClick}
                    {...(changedProducts.length === 0 && { disabled: true })}
                >ذخیره</Button>
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

                        body={products.map((row) => (
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

const mapStateToProps = ({ admin }) => ({
    product: admin.product
})

export default connect(mapStateToProps, {
    getProducts, startLoading, addChangedProduct, updateChangedProduct, removeChangedProduct, setRetrieveProducts, updateProduct
})(ProductQuantityPage)