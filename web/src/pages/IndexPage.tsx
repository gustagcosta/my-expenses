import Layout from '../components/Layout'

export default function IndexPage() {
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
