import { useState, useEffect } from 'react'
import axios from 'axios'

import AdminLayout from 'layout/admin/Admin.layout'

import AdminTable from 'pages/admin/components/AdminTable'

import RouterLink from 'components/RouterLink'
import ManageProduct from 'pages/admin/components/ManageProduct'

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

const ProductsPage = () => {

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

    const [rows, setRows] = useState([])

    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            setRows([])
            const res = await axios.get(`/products?_page=${page + 1}&_limit=${rowsPerPage}`)
            res.data.map((item) => {
                let { id, image, name, categories } = item
                return setRows(rows => [...rows, { id, image, name, categories }])
            })
            setTotalCount(+res.headers['x-total-count'])
        }
        fetchData()
    }, [page, rowsPerPage])

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const [manageProduct, setManageProduct] = useState({
        open: false,
        title: undefined,
        id: undefined
    })

    const handleManageProduct = (title, id) => {
        console.log('Open')
        setManageProduct({ open: true, title, id })
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
                    onClick={() => handleManageProduct('افزودن کالای جدید')}
                >افزودن کالا</Button>
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
                                        onClick={() => handleManageProduct('ویرایش کالا', row.id)}
                                    >ویرایش</Button>
                                    <Button
                                        color="primary"
                                        startIcon={<IoMdTrash />}
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

export default ProductsPage