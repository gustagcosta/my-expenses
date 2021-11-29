import React, { ReactNode, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const history = useHistory()

  document.title = 'My Expenses ' + title

  const handleLogout = () => {
    logout()
    history.push('/sign-in')
  }

  return (
    <div>
      <header>
        <nav>
          <ul className='flex justify-center border-b p-4'>
            {isAuthenticated && (
              <li className='mr-6'>
                <button
                  onClick={handleLogout}
                  className='text-blue-500 hover:text-blue-800'
                >
                  Logout
                </button>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li className='mr-6'>
                  <Link to='/sign-in'>
                    <a className='text-blue-500 hover:text-blue-800'>Sign in</a>
                  </Link>
                </li>
                <li className='mr-6'>
                  <Link to='/sign-up'>
                    <a className='text-blue-500 hover:text-blue-800'>Sign up</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className='container mx-auto'>{children}</main>
    </div>
  )
}

export default Layout
