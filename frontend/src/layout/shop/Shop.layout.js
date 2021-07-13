// Components
import Header from 'layout/shop/components/Header'
import Footer from 'layout/shop/components/Footer'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
    main: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            minHeight: 'calc(100vh - 164px)'
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: 'calc(100vh - 116px)'
        },
    }
}))

const ShopLayout = ({ children, maxWidth }) => {

    const classes = useStyles();

    return (
        <>
            <Header />
            <Container component='main' maxWidth={maxWidth || 'xl'} className={classes.main}>
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default ShopLayout
