import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getProducts, removeProduct, startLoading } from 'redux/actions/admin/product.action'

// Components
import RouterLink from 'components/RouterLink'
import AdminLayout from 'layout/admin/Admin.layout'
import AdminTable from 'pages/admin/components/AdminTable'
import ManageProduct from 'pages/admin/components/ManageProduct'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import { IoMdCreate, IoMdTrash } from 'react-icons/io'

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
    addButton: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
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

const ProductsPage = ({ getProducts, removeProduct, startLoading, product: { products, totalCount, newProduct, loading } }) => {

    const classes = useStyles()

    const columns = [
        {
            id: 'image',
            label: 'تصویر'
        },
        {
            id: 'name',
            label: 'نام کالا'
        },
        {
            id: 'category',
            label: 'دسته بندی'
        },
        {
            id: 'action',
            label: 'عملیات'
        },
    ]

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // Get Products
    useEffect(() => {
        startLoading()
        getProducts(page, rowsPerPage)
    }, [startLoading, getProducts, page, rowsPerPage, newProduct])

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const [manageProduct, setManageProduct] = useState({
        open: false,
        type: undefined,
        title: undefined,
        id: undefined
    })

    const handleManageProduct = (type, title, id) => {
        setManageProduct({ open: true, type, title, id })
    }

    const handleRemoveClick = (id, name) => {
        if (window.confirm(`آیا می خواهید ${name} را حذف کنید؟`))
            removeProduct(id)
    }

    return (
        <AdminLayout>
            {manageProduct.open && <ManageProduct options={manageProduct} setOptions={setManageProduct} />}

            <div className={classes.topMenu}>
                <Typography variant="h6">مدیریت کالا ها</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.addButton}
                    onClick={() => handleManageProduct('new', 'افزودن کالای جدید')}
                > افزودن کالا</Button>
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

                        body={products.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left" style={{ width: "10%" }} >
                                    <Avatar variant="rounded" src={row.image} className={classes.image} >
                                        {!row.image && 'No Image'}
                                    </Avatar>
                                </TableCell>
                                <TableCell align="left" style={{ width: "40%" }} size='small'><RouterLink to={`/shop/product/${row.id}`} color="inherit">{row.name}</RouterLink></TableCell>
                                <TableCell align="left" style={{ width: "35%" }}>{row.categories.map((category, index, array) => {
                                    return (
                                        <span key={category}>
                                            {category}
                                            {array.length - 1 !== index && ' / '}
                                        </span>
                                    )
                                })}</TableCell>
                                <TableCell align="left" style={{ width: "15%" }}>
                                    <Button
                                        color="secondary"
                                        startIcon={<IoMdCreate />}
                                        onClick={() => handleManageProduct('edit', 'ویرایش کالا', row.id)}
                                    > ویرایش</Button>
                                    <Button
                                        color="primary"
                                        startIcon={<IoMdTrash />}
                                        onClick={() => handleRemoveClick(row.id, row.name)}
                                    >حذف</Button>
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
        </AdminLayout >
    )
}

const mapStateToProps = ({ admin }) => ({
    product: admin.product
})

export default connect(mapStateToProps, {
    getProducts, removeProduct, startLoading
})(ProductsPage)