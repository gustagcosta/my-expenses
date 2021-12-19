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
      <br />
      <ul className='list-reset flex border-b'>
        <li className='-mb-px mr-1'>
          <a
            className='bg-white inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t'
            href='#'
          >
            Active
          </a>
        </li>
        <li className='mr-1'>
          <a
            className='bg-white inline-block py-2 px-4 font-semibold '
            href='#'
          >
            Tab
          </a>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage
