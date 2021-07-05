import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Redux
import { getProduct, addProduct, getCategories, startModalLoading } from 'redux/actions/admin/admin.action'

// Utils
import { productValidation } from 'utils/formValidation'

// UI
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'

import { IoMdClose } from 'react-icons/io'

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        overflowX: 'hidden'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    upload: {
        display: 'flex'
    },
    uploadPath: {
        flex: 1
    },
    uploadButton: {
        height: 56,
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 8
    }
}))

const ManageProduct = ({ options: { open, type, title, id }, setOptions, getProduct, addProduct, getCategories, startModalLoading, admin: { product, categories, modalLoading } }) => {

    const theme = useTheme()
    const classes = useStyles()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categories: [],
        image: {},
        price: '',
        quantity: ''
    })
    const { name, description, image, price, quantity } = formData

    const [errors, setErrors] = useState({})

    useEffect(() => {
        startModalLoading()
        getCategories()
        if (id !== undefined) {
            getProduct(id)
        }
    }, [getProduct, getCategories, startModalLoading, id])

    useEffect(() => {
        if (product && type === 'edit')
            setFormData({ ...product })
    }, [ product, type])

    const handelChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
        productValidation({ [name]: value }, formData, errors, setErrors)
    }

    const handleClose = () => {
        setOptions({ open: false, title: '' })
    }

    const handleSubmit = () => {
        console.log(formData)
        if (productValidation(formData, formData, errors, setErrors)) {
            setOptions({ open: false, title: '' })
            addProduct(formData)
        }
    }

    const selectedCategory = formData.categories[formData.categories.length - 1] || null

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth={'sm'}
                scroll={'paper'}
                fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
            >
                <DialogTitle className={classes.title} disableTypography  >
                    <IconButton onClick={handleClose}>
                        <IoMdClose />
                    </IconButton>
                    <Typography variant="h6">{title}</Typography>
                </DialogTitle>

                <DialogContent dir="rtl" dividers className={classes.content}>
                    {modalLoading ? <div className={classes.spinner}><CircularProgress /></div> :
                        <>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel>تصویر کالا</FormLabel>
                                <div className={classes.upload}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        color="secondary"
                                        className={classes.uploadPath}
                                        value={(image && image.name) || (image && image.length > 0 && image) || ''}
                                        disabled
                                    />
                                    <div>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            className={classes.uploadButton}
                                        >
                                            انتخاب فایل
                                            <input
                                                accept="image/*"
                                                type="file"
                                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                                hidden
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </FormControl>

                            <TextField
                                label="نام کالا"
                                variant="outlined"
                                margin="normal"
                                color="secondary"
                                fullWidth
                                name="name"
                                onChange={e => handelChange(e)}
                                value={name}
                                required
                                {...(errors.name && { error: true, helperText: errors.name })}
                            />

                            <TextField
                                select
                                label="دسته بندی"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                value={selectedCategory ? selectedCategory : ''}
                                {...(errors.categories && { error: true, helperText: errors.categories })}
                            >
                                {categories.map(category => category.subset &&
                                    [<ListSubheader key={category.id} className="MuiListItem-root" dir="rtl">{category.name}</ListSubheader>,
                                    categories.map(child => child.parentId === category.id &&
                                        <MenuItem
                                            dir="rtl"
                                            value={child.name}
                                            key={child.id}
                                            style={{ paddingRight: 40 }}
                                            onClick={() => {
                                                setFormData({ ...formData, categories: [category.name, child.name] })
                                            }}
                                        >{child.name}</MenuItem>
                                    )]
                                )}
                            </TextField>

                            <TextField
                                label="توضیحات"
                                variant="outlined"
                                margin="normal"
                                color="secondary"
                                fullWidth
                                multiline
                                rows={5}
                                name="description"
                                onChange={e => handelChange(e)}
                                value={description}
                                required
                                {...(errors.description && { error: true, helperText: errors.description })}
                            />

                            <Grid container spacing={1}>
                                <Grid item xs={7}>
                                    <TextField
                                        label="قیمت"
                                        type="number"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        className={classes.marginLeft}
                                        name="price"
                                        onChange={e => handelChange(e)}
                                        value={price}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="موجودی"
                                        type="number"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        name="quantity"
                                        onChange={e => handelChange(e)}
                                        value={quantity}
                                    />
                                </Grid>
                            </Grid>
                        </>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" color="secondary" size="large">
                        ذخیره
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {
    getProduct, addProduct, getCategories, startModalLoading
})(ManageProduct)