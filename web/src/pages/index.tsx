import { useContext } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'

const IndexPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <Layout title='Home'>
      <p>Aqui vai ter uma listagem com todas as contas a pagar do amigo</p>
    </Layout>
  )
}

export default IndexPage
