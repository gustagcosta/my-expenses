import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link as LinkStyle,
  Button,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from '@mui/material'
import { ReactNode, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => {
  const { logout, user } = useContext(AuthContext)
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  document.title = 'My Expenses ' + title

  const handleLogout = () => {
    logout()
    history.push('/sign-in')
  }

  const authItens = [
    <MenuItem onClick={() => console.log('need implementation')}>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      Profile
    </MenuItem>,
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      Logout
    </MenuItem>,
  ]

  const publicItens = [
    <MenuItem onClick={handleClose}>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <Link to='/sign-up' style={{ textDecoration: 'none', color: 'inherit' }}>
        Sign Up
      </Link>
    </MenuItem>,
    <MenuItem onClick={handleClose}>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <Link to='/sign-in' style={{ textDecoration: 'none', color: 'inherit' }}>
        Sign In
      </Link>
    </MenuItem>,
  ]

  return (
    <div>
      <BrowserView>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              My Expenses {user && ` - ${user.name}`}
            </Typography>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              aria-controls='basic-menu'
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </BrowserView>
      <MobileView>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              variant='h6'
              align='center'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              My Expenses {user && ` - ${user.name}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Fab
          size='small'
          color='primary'
          aria-label='add'
          style={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }}
          id='basic-button'
          aria-controls='basic-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </Fab>
      </MobileView>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user ? authItens.map((i) => i) : publicItens.map((i) => i)}
      </Menu>

      <Container component='main' maxWidth='xs'>
        {children}
      </Container>
    </div>
  )
}

export default Layout
