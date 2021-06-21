import { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import RouterLink from 'components/RouterLink'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'

import { IoMdArrowDropdown } from 'react-icons/io'

const MobileHeaderMenu = ({ menuOptions }) => {

    const location = useLocation()

    const anchorRef = useRef(null)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [selectedMenuIndex, setSelectedMenuIndex] = useState(
        location.pathname.includes('products') ? 0 :
            location.pathname.includes('quantity') ? 1 :
                location.pathname.includes('orders') ? 2 :
                    0
    )

    const handleMobileMenuItemClick = (event, index) => {
        setSelectedMenuIndex(index)
        setIsMenuOpen(false)
    }

    const handleMobileMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleMobileMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setIsMenuOpen(false)
    }

    return (
        <>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef}>
                <Button>{menuOptions[selectedMenuIndex].name}</Button>
                <Button
                    color="primary"
                    size="small"
                    onClick={handleMobileMenuToggle}
                >
                    <IoMdArrowDropdown />
                </Button>
            </ButtonGroup>
            <Popper open={isMenuOpen} anchorEl={anchorRef.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleMobileMenuClose}>
                                <MenuList id="split-button-menu">
                                    {menuOptions.map((option, index) => (
                                        <RouterLink key={option.id} to={option.path} color="inherit">
                                            <MenuItem
                                                selected={index === selectedMenuIndex}
                                                onClick={(event) => handleMobileMenuItemClick(event, index)}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        </RouterLink>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

export default MobileHeaderMenu
