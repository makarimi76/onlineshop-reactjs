import React from 'react'

// Components
import Header from 'layout/shop/components/Header'
import Footer from 'layout/shop/components/Footer'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

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

const ProductsLayout = ({ children, side }) => {

    const classes = useStyles();

    return (
        <>
            <Header />
            <Grid component='main' container className={classes.main}>
                <Hidden smDown>
                    <Grid item md={3} >
                        {side}
                    </Grid>
                </Hidden>

                <Grid item xs={12} md={9} >
                    {children}
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default ProductsLayout
