import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'

const IndexPage = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/sign-in')
    }
  }, [])

  return (
    <Layout title='Index'>
      <p>Aqui vai ter uma listagem com todas as contas a pagar do amigo</p>
    </Layout>
  )
}

export default IndexPage
