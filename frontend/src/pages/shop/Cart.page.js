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
import Typography from '@material-ui/core/Typography'

import { IoMdTrash } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(4)
    },
    noCart: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(8)
    },
    bottomMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    }, checkout: {
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
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
            {carts.length === 0 ? (
                <div className={classes.noCart}><Typography variant="h6" color="error" align="center">سبد خرید شما خالی می باشد</Typography></div>
            ) :
                <>
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

                    <div className={classes.bottomMenu}>
                        <Typography variant="h6">جمع: {carts.map(cart => cart.price * cart.quantity).reduce((a, b) => a + b, 0)} تومان</Typography>
                        <Button
                            className={classes.checkout}
                            variant="contained"
                            size="large"
                        >نهایی کردن سبد خرید</Button>
                    </div>
                </>
            }
        </ShopLayout>
    )
}

const mapStateToProps = ({ shop }) => ({
    cart: shop.cart
})

export default connect(mapStateToProps, { removeCart })(CartPage)