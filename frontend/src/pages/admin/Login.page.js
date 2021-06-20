import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import AdminLoginLayout from 'layout/admin/Login.layout'

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

const LoginPage = () => {

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
        console.log(loginFormData)
        history.push('/admin')
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
                />
                <TextField
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

export default LoginPage