import { useState } from 'react'
import { connect } from 'react-redux'

// Redux
import { addOrder } from 'redux/actions/shop/order.action'

// Components
import ShopLayout from 'layout/shop/Shop.layout'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(4),
            padding: theme.spacing(2)
        }
    },
    noCart: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(8)
    },
    input: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: `calc(50% - ${theme.spacing(1)}px)`,
        }
    },
    inputerRight: {
        marginRight: theme.spacing(2)
    },
    pay: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: theme.spacing(2)
    },
    payBtn: {
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    }
}))

const CheckoutPage = ({ cart: { carts }, addOrder }) => {

    const classes = useStyles()

    const [formData, setFormData] = useState({
        name: '',
        familyName: '',
        address: '',
        phone: '',
        shippingTime: '',
        orderList: carts
    })
    const { name, familyName, address, phone, shippingTime } = formData

    const handelChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
        // productValidation({ [name]: value }, formData, errors, setErrors)
    }

    const handlePayClick = () => {
        addOrder(formData)
    }

    return (
        <ShopLayout maxWidth='md' pageTitle="نهایی کردن خرید">
            {carts.length === 0 ? (
                <div className={classes.noCart}><Typography variant="h6" color="error" align="center">سبد خرید شما خالی می باشد</Typography></div>
            ) :
                <Paper elevation={3} className={classes.root}>
                    <div>

                        <TextField
                            label="نام"
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            className={classes.input + ' ' + classes.inputerRight}
                            name="name"
                            onChange={e => handelChange(e)}
                            value={name}
                        />

                        <TextField
                            label="نام خانوادگی"
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            className={classes.input}
                            name="familyName"
                            onChange={e => handelChange(e)}
                            value={familyName}
                        />

                        <TextField
                            label="آدرس"
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            className={classes.input + ' ' + classes.inputerRight}
                            multiline
                            rows={5}
                            name="address"
                            onChange={e => handelChange(e)}
                            value={address}
                        />

                        <TextField
                            label="تلفن همراه"
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            className={classes.input}
                            name="phone"
                            onChange={e => handelChange(e)}
                            value={phone}
                        />

                        <TextField
                            label="تاریخ تحویل"
                            type="datetime-local"
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            className={classes.input + ' ' + classes.inputerRight}
                            name="shippingTime"
                            onChange={e => handelChange(e)}
                            value={shippingTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div className={classes.pay}>
                        <Button
                            className={classes.payBtn}
                            variant="contained"
                            size="large"
                            onClick={handlePayClick}
                        >
                            پرداخت
                        </Button>
                    </div>
                </Paper>
            }
        </ShopLayout>
    )
}

const mapStateToProps = ({ shop }) => ({
    cart: shop.cart
})

export default connect(mapStateToProps, { addOrder })(CheckoutPage)