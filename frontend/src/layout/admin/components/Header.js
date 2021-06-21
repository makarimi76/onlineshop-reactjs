import RouterLink from 'components/RouterLink'

import DesktopHeaderMenu from './DesktopHeaderMenu'
import MobileHeaderMenu from 'layout/admin/components/MobileHeaderMenu'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import { IoMdArrowRoundBack } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
        }
    },
    sectionMobile: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    }
}))

const Header = () => {

    const classes = useStyles()

    const menuOptions = [
        { id: '1', name: 'کالا ها', path: '/admin/products' },
        { id: '2', name: 'موجودی و قیمت ها', path: '/admin/quantity' },
        { id: '3', name: 'سفارش ها', path: '/admin/orders' }
    ]

    return (
        <AppBar position="static" color="secondary">
            <Toolbar className={classes.toolbar}>
                {/* Desktop */}
                <div className={classes.sectionDesktop}>
                    <Typography variant="h6">
                        پنل مدیریت فروشگاه
                    </Typography>

                    <DesktopHeaderMenu menuOptions={menuOptions} />

                    <RouterLink to='/'><Button color="inherit">بازگشت به سایت</Button></RouterLink>
                </div>

                {/* Mobile */}
                <div className={classes.sectionMobile}>
                    <Typography variant="body1">
                        پنل مدیریت
                    </Typography>

                    <MobileHeaderMenu menuOptions={menuOptions} />

                    <RouterLink to='/'>
                        <IconButton color="inherit">
                            <IoMdArrowRoundBack />
                        </IconButton>
                    </RouterLink>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header