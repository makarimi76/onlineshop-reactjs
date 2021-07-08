import { useEffect } from 'react'
import { connect } from 'react-redux'

// Redux
import { getCategories } from 'redux/actions/shop/category.action'

//Componnets
import ProductsLayout from 'layout/shop/Products.layout'
import Categories from 'pages/shop/products/components/Categories'

const ProductsPage = ({ match, category: { categories, loading }, getCategories }) => {

    useEffect(() => {
        if (categories.length === 0)
            getCategories()
    }, [getCategories, categories])

    return (
        <ProductsLayout side={<Categories />}>
            {match.params.category} Products Page
        </ProductsLayout>
    )
}

const mapStateToProps = ({ shop }) => ({
    category: shop.category
})

export default connect(mapStateToProps, {
    getCategories
})(ProductsPage)