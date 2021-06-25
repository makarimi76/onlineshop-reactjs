import { useState, useEffect } from 'react'
import axios from 'axios'
import RouterLink from 'components/RouterLink'

import AdminLayout from 'layout/admin/Admin.layout'

import AdminTable from 'pages/admin/components/AdminTable'
import EditText from 'pages/admin/components/EditText'

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

const ProductQuantityPage = () => {

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

    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            setRows([])
            const res = await axios.get(`/products?_page=${page + 1}&_limit=${rowsPerPage}`)
            res.data.map((item) => {
                let { id, name, price, quantity } = item
                return setRows(rows => [...rows, { id, name, price, quantity }])
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

    return (
        <AdminLayout>
            <div className={classes.topMenu}>
                <Typography variant="h6">مدیریت موجودی و قیمت ها</Typography>
                <Button variant="contained" color="secondary">ذخیره</Button>
            </div>

            {rows.length === 0 ? <div className={classes.spinner}><CircularProgress /></div> :
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

export default ProductQuantityPage