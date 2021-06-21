import React from 'react'

import Header from 'layout/admin/components/Header'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(4)
        }
    }
}))

const AdminLayout = ({ children }) => {

    const classes = useStyles()

    return (
        <>
            <Header />
            <main className={classes.main}>
                {children}
            </main>
        </>
    )
}

export default AdminLayout
