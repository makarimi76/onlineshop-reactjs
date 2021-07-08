import { useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getCategorizedProducts } from 'redux/actions/shop/product.action'

// Componnets
import ProductItem from 'pages/shop/components/ProductsItem'

// UI
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }
}))

const CategorizedProducts = ({ category: { name, slug }, product: { categorizedProducts, limitCategorizedProducts, loading }, getCategorizedProducts }) => {

    const classes = useStyles()

    useEffect(() => {
        if (!categorizedProducts[slug])
            getCategorizedProducts(name, slug, limitCategorizedProducts)
    }, [getCategorizedProducts])

    return (loading ? <div className={classes.spinner}><CircularProgress /></div> :
        <Grid container spacing={3} className={classes.box}>
            {
                categorizedProducts[slug] &&
                categorizedProducts[slug].map(item => (
                    <Grid key={item.id} item xs={12} sm={6} md={6} lg={4} xl={3} >
                        <ProductItem product={item} />
                    </Grid>
                ))
            }
        </Grid>
    )
}


const mapStateToProps = ({ shop }) => ({
    product: shop.product
})

export default connect(mapStateToProps, {
    getCategorizedProducts
})(CategorizedProducts)