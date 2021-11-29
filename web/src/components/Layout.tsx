import React, { ReactNode, useContext, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { AuthContext } from '../contexts/AuthContext'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'My Expenses' }: Props) => {
  const { user, isAuthenticated, logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <Head>
        <title>My Expenses - {title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <nav>
          <ul className='flex border-b p-4'>
            <li className='mr-6'>
              <Link href='/'>
                <a className='text-blue-500 hover:text-blue-800'>Home</a>
              </Link>
            </li>

            {isAuthenticated && (
              <>
                <li className='mr-6'>
                  <Link href='/dashboard'>
                    <a className='text-blue-500 hover:text-blue-800'>
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li className='mr-6'>
                  <button
                    onClick={handleLogout}
                    className='text-blue-500 hover:text-blue-800'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
              <li className='mr-6'>
                <Link href='/sign-in'>
                  <a className='text-blue-500 hover:text-blue-800'>Sign in</a>
                </Link>
              </li>
              <li className='mr-6'>
              <Link href='/sign-up'>
                <a className='text-blue-500 hover:text-blue-800'>Sign up</a>
              </Link>
            </li>
            </>
            )}
          </ul>
        </nav>
      </header>
      {children}
    </div>
  )
}

export default Layout
