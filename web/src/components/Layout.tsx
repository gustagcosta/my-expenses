import { ReactNode, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext)
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
            {isAuthenticated ? (
              <>
                <li className='mr-6'>
                  <button
                    onClick={handleLogout}
                    className='text-blue-500 hover:text-blue-800'
                  >
                    Logout - {user.name}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='mr-6'>
                  <Link
                    to='/sign-in'
                    className='text-blue-500 hover:text-blue-800'
                  >
                    Sign in
                  </Link>
                </li>
                <li className='mr-6'>
                  <Link
                    className='text-blue-500 hover:text-blue-800'
                    to='/sign-up'
                  >
                    Sign up
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
