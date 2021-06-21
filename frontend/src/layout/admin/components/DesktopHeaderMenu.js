import RouterLink from 'components/RouterLink'

import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

const DesktopHeaderMenu = ({ menuOptions }) => {
    return (
        <ButtonGroup variant="contained" color="primary" >
            {menuOptions.map((option => {
                return (
                    <Button key={option.id}><RouterLink to={option.path}>{option.name}</RouterLink></Button>
                )
            }))}
        </ButtonGroup>
    )
}

export default DesktopHeaderMenu
