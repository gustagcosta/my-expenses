import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
import { DataGrid } from '@mui/x-data-grid'
import ErrorAlert from '../components/ErrorAlert'
import { api } from '../services/api'
import { Grid } from '@mui/material'
import moment from 'moment'

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'expire_date', headerName: 'Expire Date', width: 200 },
  { field: 'value', headerName: 'Value', width: 100 },
]

export default function IndexPage() {
  const { signIn, user } = useContext(AuthContext)
  const history = useHistory()
  const [rows, setRows] = useState([])
  const [bills, setBills] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }

    loadBills()
  }, [history, user])

  const loadBills = async () => {
    setError('')

    const response = await api(`/api/v1/bills`, 'GET')

    if (response.status === 200) {
      const bills = await response.json()
      const rows = bills.map((b) => {
        return {
          id: b.id,
          description: b.description,
          expire_date: moment(b.expire_date).format('DD/MM/YYYY'),
          value: b.value,
        }
      })
      setRows(rows)
      setBills(bills)
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <Layout title='Index'>
      <Grid width={'100%'}>
        <DataGrid
          style={{ marginTop: '15px' }}
          rows={rows}
          autoHeight
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <Grid width={'100%'}>
        {error && (
          <ErrorAlert error={error} handleClose={() => setError(null)} />
        )}
      </Grid>
    </Layout>
  )
}
