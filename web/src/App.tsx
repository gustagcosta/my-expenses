import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './contexts/AuthContext'

import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import './styles/global.css'

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/sign-in', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path='/' component={IndexPage} exact />
            <Route path='/sign-in' component={SignInPage} exact />
            <Route path='/sign-up' component={SignUpPage} exact />
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
