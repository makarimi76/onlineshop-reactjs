import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Redux
import { getCategories } from 'redux/actions/shop/category.action'
import { getProductsByCategory, startProductLoading } from 'redux/actions/shop/product.action'

//Componnets
import ProductsLayout from 'layout/shop/Products.layout'
import Categories from 'pages/shop/products/components/Categories'
import ProductItem from 'pages/shop/components/ProductsItem'

// UI
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
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

const ProductsPage = ({ match, category: { categories }, product: { products, loading }, getCategories, getProductsByCategory, startProductLoading }) => {

    const classes = useStyles()

    const [category, setCategoty] = useState(null)
    useEffect(() => {
        if (categories.length === 0)
            getCategories()
    }, [getCategories, categories])


    useEffect(() => {
        const findCategory = categories.find(item => item.slug === match.params.category)
        setCategoty(findCategory)
        if (categories.length !== 0) {
            startProductLoading()
            getProductsByCategory(findCategory.name, 1, 10)
        }
    }, [match, categories])

    return (
        <ProductsLayout side={<Categories />}>
            {loading ? <div className={classes.spinner}><CircularProgress /></div> :
                [<Typography variant="h5">کالا های گروه {category.name.replace('کالاهای', '')}</Typography>,
                <Grid container spacing={3} className={classes.box}>
                    {products.map(item => (
                        <Grid key={item.id} item xs={12} sm={6} md={6} lg={4} >
                            <ProductItem product={item} />
                        </Grid>
                    ))}
                </Grid>
                ]
            }
        </ProductsLayout>
    )
}

const mapStateToProps = ({ shop }) => ({
    category: shop.category,
    product: shop.product
})

export default connect(mapStateToProps, {
    getCategories, getProductsByCategory, startProductLoading
})(ProductsPage)