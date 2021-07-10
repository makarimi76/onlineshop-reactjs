import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Redux
import { getProduct, startProductLoading } from 'redux/actions/shop/product.action'
import { getCategories } from 'redux/actions/shop/category.action'

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
            marginTop: theme.spacing(1)
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
    }
}))

const ProductPage = ({ match, product: { product, loading }, category: { categories }, getProduct, startProductLoading, getCategories }) => {

    const classes = useStyles()

    useEffect(() => {
        startProductLoading()
        getProduct(match.params.id)
    }, [match])

    useEffect(() => {
        if (categories.length === 0)
            getCategories()
    }, [])

    return (loading ? <div className={classes.spinner}><CircularProgress /></div> :
        !product ? <Redirect to='/404' /> :
            <ShopLayout maxWidth='md'>
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
                                    if (index === array.length - 1)
                                        return (
                                            <div key={category} >
                                                <RouterLink to={findCategory && `/shop/products/${findCategory.slug}`} color='black'>
                                                    {category}
                                                </RouterLink>
                                            </div>
                                        )
                                    else {
                                        return (
                                            <div key={category} >
                                                <RouterLink key={category} to={findCategory && `/shop/products/${findCategory.slug}`} color='inherit'>
                                                    {category}
                                                </RouterLink>
                                            </div>
                                        )
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
                                    />
                                    <Button
                                        className={classes.addToCart}
                                        variant="contained"
                                        endIcon={<IoMdAddCircleOutline />}
                                    >افزودن به سبد خرید</Button>
                                </div>
                            </>
                        }
                    </Grid>
                    <Typography variant="subtitle1" className={classes.marginT2}>
                        {product.description}
                    </Typography>
                </Grid>
            </ShopLayout >
    )
}

const mapStateToProps = ({ shop }) => ({
    product: shop.product,
    category: shop.category
})

export default connect(mapStateToProps, {
    getProduct, startProductLoading, getCategories
})(ProductPage)