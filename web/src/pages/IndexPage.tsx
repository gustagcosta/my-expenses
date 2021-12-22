import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'

export default function IndexPage() {
  const { signIn, user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }
  }, [])

  return <Layout title='Index'></Layout>
}
