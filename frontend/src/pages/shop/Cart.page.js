import { connect } from 'react-redux'

// Redux
import { removeCart } from 'redux/actions/shop/cart.action'
// Components
import ShopLayout from 'layout/shop/Shop.layout'
import Table from 'components/Table'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

import { IoMdTrash } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(4)
    }
}))

const CartPage = ({ cart: { carts }, removeCart }) => {

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
        {
            id: 'action',
            label: 'عملیات'
        }
    ]

    const handleRemoveClick = (id) => {
        const cartProductIndex = carts.findIndex(item => item.id === id)
        if (cartProductIndex !== -1)
            removeCart(cartProductIndex)
    }

    return (
        <ShopLayout maxWidth='md' pageTitle="سبد خرید">
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

                    body={carts.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left" style={{ width: "50%" }} size='small'>{row.name}</TableCell>
                            <TableCell align="left" style={{ width: "20%" }}>{row.price}</TableCell>
                            <TableCell align="left" style={{ width: "15%" }}>{row.quantity}</TableCell>
                            <TableCell align="left" style={{ width: "15%" }}>
                                <Button
                                    color="primary"
                                    startIcon={<IoMdTrash />}
                                    onClick={() => handleRemoveClick(row.id)}
                                >حذف</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                />
            </Paper>
        </ShopLayout>
    )
}

const mapStateToProps = ({ shop }) => ({
    cart: shop.cart
})

export default connect(mapStateToProps, { removeCart })(CartPage)