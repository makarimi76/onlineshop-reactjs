import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Redux
import { getOrder, updateOrder } from 'redux/actions/shop/order.action'

// Components
import ShopLayout from 'layout/shop/Shop.layout'

// UI
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    result: {
        width: '100%',
        marginTop: theme.spacing(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    message: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50%',
        }
    },
    logo: {
        fontSize: '30vh'
    },
    success: {
        color: theme.palette.success.main
    },
    faild: {
        color: theme.palette.error.main
    }
}))

const PaymentResultPage = ({ match, location, order: { order, loading, error }, getOrder, updateOrder }) => {

    const classes = useStyles()

    const idParam = match.params.id
    const paidQuery = new URLSearchParams(location.search).get("paid")

    useEffect(() => {
        if (idParam)
            getOrder(idParam)
    }, [idParam])

    useEffect(() => {
        if (order) {
            if (paidQuery === "yes")
                updateOrder(order, true)
            else
                updateOrder(order, false)
        }
    }, [paidQuery, order])

    return (
        <ShopLayout maxWidth='md' pageTitle="نتیجه پرداخت">
            {loading ?
                (
                    <div className={classes.spinner}><CircularProgress /></div>
                ) : error ?
                    (
                        <Redirect to="/404" />
                    )
                    :
                    paidQuery === "yes" ?
                        (
                            <div className={classes.result}>
                                <IoMdCheckmarkCircle className={classes.logo + ' ' + classes.success} />
                                <Typography className={classes.message} variant="h6" align="center" >
                                    با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی برای ارسال با شما تماس گرفته خواهد شد
                                </Typography>
                            </div>
                        ) :
                        (
                            <div className={classes.result}>
                                <IoMdCloseCircle className={classes.logo + ' ' + classes.faild} />
                                <Typography className={classes.message} variant="h6" align="center" >
                                    پرداخت موفقیت آمیز نبود، سفارش شما در انتظار پرداخت است
                                </Typography>
                            </div>
                        )
            }
        </ShopLayout >
    )
}

const mapStateToProps = ({ shop }) => ({
    order: shop.order
})

export default connect(mapStateToProps, { getOrder, updateOrder })(PaymentResultPage)