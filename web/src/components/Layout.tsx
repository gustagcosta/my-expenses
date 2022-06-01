import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
import { ReactNode, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { BrowserView, MobileView } from 'react-device-detect'

type Props = {
  children?: ReactNode
  title?: string
}

export default function Layout({ children, title }: Props) {
  const { logout, user } = useContext(AuthContext)
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  document.title = 'My Expenses ' + title

  const handleLogout = () => {
    logout()
    history.push('/sign-in')
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            My Expenses {user && ` - ${user.name}`}
          </Typography>
          <BrowserView>
            {user && [
              <Button
                onClick={handleLogout}
                sx={{ color: 'white', display: 'inline-block' }}
              >
                Logout
              </Button>,
            ]}
          </BrowserView>
        </Toolbar>
      </AppBar>

      <MobileView>
        <Fab
          size='small'
          color='primary'
          style={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MenuIcon />
        </Fab>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={(e) => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {user
            ? [
                
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  Logout
                </MenuItem>,
              ]
            : [
                <MenuItem onClick={(e) => setAnchorEl(null)}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <Link
                    to='/sign-up'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Sign Up
                  </Link>
                </MenuItem>,
                <MenuItem onClick={(e) => setAnchorEl(null)}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <Link
                    to='/sign-in'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Sign In
                  </Link>
                </MenuItem>,
              ]}
        </Menu>
      </MobileView>

      <Container component='main'>{children}</Container>

      
    </div>
  )
}
