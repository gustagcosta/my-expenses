import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/' component={IndexPage} exact />
          <Route path='/sign-in' component={SignInPage} exact />
          <Route path='/sign-up' component={SignUpPage} exact />
        </Switch>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
