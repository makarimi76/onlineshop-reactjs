import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'

import { IoMdCart } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    button: {
        marginLeft: theme.spacing(3)
    },
    icon: {
        fontSize: 30
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

const Header = () => {

    const classes = useStyles();

    const cart = () => {
        return (
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={3} color="secondary">
                    <IoMdCart />
                </Badge>
            </IconButton>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    فروشگاه
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <Button color="inherit" className={classes.button}>مدیریت</Button>
                    
                    {cart()}
                    <Button color="inherit">
                        سبد خرید
                    </Button>
                </div>
                <div className={classes.sectionMobile}>
                    <Button color="inherit" className={classes.button}>مدیریت</Button>
                    {cart()}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header