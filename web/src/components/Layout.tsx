import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'My Expenses' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link href='/about'>
          <a>About</a>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link href='/about'>
          <a>Login</a>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link href='/about'>
          <a>Register</a>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link href='/about'>
          <a>Logout</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
