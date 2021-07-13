import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Redux
import { getProduct, startProductLoading } from 'redux/actions/shop/product.action'
import { getCategories } from 'redux/actions/shop/category.action'
import { addCart, updateCart } from 'redux/actions/shop/cart.action'
import { setAlert } from 'redux/actions/alert.action'

// Components
import ShopLayout from 'layout/shop/Shop.layout'
import RouterLink from 'components/RouterLink'

// UI
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { IoMdArrowDropleft, IoMdAddCircleOutline } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(4)
        }
    },
    imageBox: {
        position: 'relative',
        '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '100%'
        }
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        [theme.breakpoints.up('sm')]: {
            border: '1px solid rgb(0 0 0 / 10%)'
        }
    },
    noImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'whitesmoke'
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    detailsHeader: {
        flex: '1 1 0%'
    },
    marginT2: {
        marginTop: theme.spacing(2)
    },
    marginT4: {
        marginTop: theme.spacing(4)
    },
    quantity: {
        width: 100
    },
    addToCart: {
        height: 56,
        marginLeft: theme.spacing(2),
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    hr: {
        width: '100%',
        borderTop: '1px solid #e4e4e4'
    }
}))

const ProductPage = ({
    match, product: { product, loading, error }, category: { categories }, cart: { carts },
    getProduct, startProductLoading, getCategories, addCart, updateCart, setAlert
}) => {

    const classes = useStyles()

    useEffect(() => {
        startProductLoading()
        getProduct(match.params.id)
    }, [match])

    useEffect(() => {
        if (categories.length === 0)
            getCategories()
    }, [])

    // Quantity state
    const [quantity, setQuantity] = useState(0)

    const handleCart = (quantity) => {
        const cartProductIndex = carts.findIndex(item => item.id === product.id)

        const { id, name, price } = product
        if (cartProductIndex !== -1) {
            updateCart(cartProductIndex, { quantity })
        } else {
            addCart({ id, name, price, quantity })
        }
    }

    const handleClick = () => {
        if (quantity > 0) {
            if (quantity < +product.quantity + 1) {
                handleCart(quantity)
            } else {
                setAlert(`تعداد کالا بیشتر از موجودی انبار می باشد، موجودی انبار ${product.quantity} عدد می باشد`, 'warning')
            }
        } else {
            setAlert('تعداد کالا به درستی وارد نشده است', 'error')
        }
    }

    return (error && error.message.includes('404') ? <Redirect to='/404' /> :
        <ShopLayout maxWidth='md'>
            {loading ? (
                <div className={classes.spinner}><CircularProgress /></div>
            ) :
                product &&
                <Grid container spacing={3} className={classes.box}>
                    <Grid item xs={12} sm={4} className={classes.imageBox}>
                        {product.image ? <img src={product.image} className={classes.image} /> :
                            <div className={classes.image + ' ' + classes.noImage}>
                                <Typography variant="h6">بدون تصویر</Typography>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} className={classes.details}>
                        <div className={classes.detailsHeader}>
                            <Typography variant="h6">{product.name}</Typography>

                            <Breadcrumbs className={classes.marginT2} separator={<IoMdArrowDropleft />} >
                                {product.categories.map((category, index, array) => {
                                    const findCategory = categories.find(item => item.name === category && item.slug)
                                    if (findCategory) {
                                        if (index === array.length - 1)
                                            return (
                                                <div key={category} >
                                                    <RouterLink to={`/shop/products/${findCategory.slug}`} color='black'>
                                                        {category}
                                                    </RouterLink>
                                                </div>
                                            )
                                        else {
                                            return (
                                                <div key={category} >
                                                    <RouterLink to={`/shop/products/${findCategory.slug}`} color='inherit'>
                                                        {category}
                                                    </RouterLink>
                                                </div>
                                            )
                                        }
                                    }
                                }
                                )}
                            </Breadcrumbs>
                        </div>

                        {product.quantity === '0' ? <Typography variant="h6" color="error" className={classes.marginT2}>این محصول موجود نمی باشد</Typography> :
                            <>
                                <Typography variant="h6" className={classes.marginT2}>{product.price} تومان</Typography>
                                <div className={classes.marginT2}>
                                    <TextField
                                        className={classes.quantity}
                                        label="تعداد"
                                        type="number"
                                        variant="outlined"
                                        color="secondary"
                                        value={quantity}
                                        onChange={(e) => e.target.value >= 0 && setQuantity(e.target.value)}
                                    />
                                    <Button
                                        className={classes.addToCart}
                                        variant="contained"
                                        endIcon={<IoMdAddCircleOutline />}
                                        onClick={handleClick}
                                    >افزودن به سبد خرید</Button>
                                </div>
                            </>
                        }
                    </Grid>
                    <div className={classes.hr + ' ' + classes.marginT4}></div>
                    <Typography variant="subtitle1" className={classes.marginT4}>
                        {product.description}
                    </Typography>
                </Grid>
            }
        </ShopLayout >
    )
}

const mapStateToProps = ({ shop }) => ({
    product: shop.product,
    category: shop.category,
    cart: shop.cart
})

export default connect(mapStateToProps, {
    getProduct, startProductLoading, getCategories, addCart, updateCart, setAlert
})(ProductPage)