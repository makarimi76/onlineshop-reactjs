import { connect } from 'react-redux'

// Components
import RouterLink from 'components/RouterLink'

// UI
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    parent: {
        marginTop: theme.spacing(4),
        '&:hover': {
            color: theme.palette.secondary.light
        }
    },
    child: {
        padding: theme.spacing(2, 0),
        paddingLeft: theme.spacing(4),
        '&:hover': {
            color: theme.palette.primary.light
        }
    }
}))

const Categories = ({ category: { categories, loading } }) => {

    const classes = useStyles()

    return (loading ? <div className={classes.spinner}><CircularProgress /></div> :
        categories.map(category => category.parentId === 0 &&
            [
                <div key={category.id} >
                    <RouterLink to={`/shop/products/${category.slug}`} color="inherit">
                        <Typography variant="h6" className={classes.parent}>{category.name}</Typography>
                    </RouterLink>
                </div>
                ,
                categories.map(child => child.parentId === category.id &&
                    <div key={child.id} >
                        <RouterLink to={`/shop/products/${child.slug}`} color="inherit">
                            <Typography
                                variant="body1"
                                className={classes.child}
                            >{child.name}</Typography>
                        </RouterLink>
                    </div>
                )]
        )
    )
}

const mapStateToProps = ({ shop }) => ({
    category: shop.category
})

export default connect(mapStateToProps)(Categories)