import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderTop: '1px solid whitesmoke',
        [theme.breakpoints.up('sm')]: {
            height: '100px'
        },
        [theme.breakpoints.down('sm')]: {
            height: '60px'
        },
    }
}))

const Footer = () => {

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <p>Copyright &copy; Online Shop 2021</p>
        </footer>
    )
}

export default Footer