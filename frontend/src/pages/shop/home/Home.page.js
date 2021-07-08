import { useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getCategories } from 'redux/actions/shop/category.action'

// Componnets
import RouterLink from 'components/RouterLink'
import ShopLayout from 'layout/shop/Shop.layout'
import CategorizedProducts from 'pages/shop/home/CategorizedProducts'

// UI
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(4)
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(2)
        }
    }
}))

const HomePage = ({ category: { categories, loading }, product: { categorizedProducts }, getCategories }) => {

    const classes = useStyles()

    console.log()
    useEffect(() => {
        if (categories.length === 0)
            getCategories()
    }, [getCategories, categories])

    return (
        <ShopLayout>
            {loading ? <div className={classes.spinner}><CircularProgress /></div> :
                categories.map(category => category.isShowHome &&
                    <div key={category.id} className={classes.box} >
                        <RouterLink to={`/shop/products/${category.slug}`} color="inherit">
                            <Typography variant="h6">کالا های گروه {category.name.replace('کالاهای', '')}</Typography>
                        </RouterLink>
                        <CategorizedProducts category={category} />
                    </div>
                )
            }
        </ShopLayout >
    )
}

const mapStateToProps = ({ shop }) => ({
    category: shop.category,
    product: shop.product
})

export default connect(mapStateToProps, {
    getCategories
})(HomePage)