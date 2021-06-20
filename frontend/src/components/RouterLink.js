import { Link } from 'react-router-dom'

const RouterLink = ({ children, to, color }) => {

    const styles = {
        textDecoration: 'none',
        color: color ? color : '#ffffff'
    }

    return (
        <>
            <Link to={to} style={styles}>{children}</Link>
        </>
    )
}

export default RouterLink
