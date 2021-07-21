import { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Redux
import { setAlert } from 'redux/actions/alert.action'
// Components
import AdminLoginLayout from 'layout/admin/Login.layout'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { IoMdLock } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submitBtn: {
        margin: theme.spacing(3, 0, 2),
        fontSize: 16
    }
}))

const LoginPage = ({ setAlert }) => {

    const classes = useStyles()
    let history = useHistory()

    const [loginFormData, setLoginFormData] = useState({
        user: '',
        password: ''
    })
    const { user, password } = loginFormData

    const handelChange = ({ target: { name, value } }) => setLoginFormData({ ...loginFormData, [name]: value });

    const handelSubmit = (e) => {
        e.preventDefault()
        if (user === "admin" && password === "admin") {
            setAlert('ورود انجام شد', 'success')
            history.push('/admin')
        } else {
            setAlert('نام کاربری یا رمز عبور اشتباه می باشد', 'error')
        }
    }

    return (
        <AdminLoginLayout>
            <Avatar className={classes.avatar}>
                <IoMdLock />
            </Avatar>
            <Typography component="h1" variant="h5">
                ورود به پنل مدیریت
            </Typography>

            <form onSubmit={handelSubmit} className={classes.form} noValidate>
                <TextField
                    label="نام کاربری"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    fullWidth
                    id="user"
                    name="user"
                    onChange={e => handelChange(e)}
                    value={user}
                    required
                    autoFocus
                    autoComplete='off'
                />
                <TextField
                    type="password"
                    label="رمز عبور"
                    variant="outlined"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    onChange={e => handelChange(e)}
                    value={password}
                    required
                    autoComplete='off'
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submitBtn}
                >
                    ورود
                </Button>
            </form>
        </AdminLoginLayout>
    )
}

export default connect(null, { setAlert })(LoginPage)