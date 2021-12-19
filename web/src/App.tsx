import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'

import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import './styles/global.css'

function PrivateRoute({ component: Component, ...rest }) {
  const { user, isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
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
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' component={IndexPage} exact />
        <Route path='/sign-in' component={SignInPage} exact />
        <Route path='/sign-up' component={SignUpPage} exact />
      </Switch>
    </Router>
  )
}
