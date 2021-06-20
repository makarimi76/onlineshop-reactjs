
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'

import { IoMdArrowRoundBack } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    backBtn: {
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(16)
        },
        marginLeft: '90%'
    },
    box: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(8)
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        [theme.breakpoints.up('sm')]: {
            border: '1px solid #c7c7c7',
            padding: theme.spacing(2),
        },
    }
}))

const AdminLoginLayout = ({ children }) => {

    const classes = useStyles()
    let history = useHistory()

    return (
        <>
            <Container component="main" maxWidth="xs">
                <IconButton color="secondary" onClick={() => history.goBack()} className={classes.backBtn}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <div className={classes.box}>
                    {children}
                </div>
            </Container>
        </>
    )
}

export default AdminLoginLayout
