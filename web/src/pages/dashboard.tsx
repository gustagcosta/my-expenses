import Router from 'next/router'
import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'

const DashboardPage = () => {
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/sign-in')
    }
  }, [])

  return (
    <Layout title='About'>
      <h1>Dashboard</h1>
      <p>This is the dashboard page</p>
    </Layout>
  )
}

export default DashboardPage
