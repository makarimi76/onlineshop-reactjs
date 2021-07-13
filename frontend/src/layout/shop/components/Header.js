import { connect } from 'react-redux'

// Components
import RouterLink from 'components/RouterLink'

// UI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'

import { IoMdCart } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(2)
    },
    badge: {
        marginRight: theme.spacing(1)
    },
    icon: {
        fontSize: 30
    },
    cartIcon: {
        fontSize: 24
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}))

const Header = ({ cart: { carts } }) => {

    const classes = useStyles();

    const cart = (
        <Badge badgeContent={carts.length} className={classes.badge} color="secondary">
            <IoMdCart className={classes.cartIcon} />
        </Badge>
    )

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <RouterLink to='/'>
                        فروشگاه
                    </RouterLink>
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <RouterLink to='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></RouterLink>
                    <Button color="inherit">
                        {cart}
                        سبد خرید
                    </Button>
                </div>
                <div className={classes.sectionMobile}>
                    <RouterLink to='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></RouterLink>
                    <Button color="inherit">
                        {cart}
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = ({ shop }) => ({
    cart: shop.cart
})

export default connect(mapStateToProps)(Header)