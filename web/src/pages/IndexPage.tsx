import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import {
  Grid,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
} from '@mui/material'
import moment from 'moment'
import InboxIcon from '@mui/icons-material/Inbox'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import ErrorAlert from '../components/ErrorAlert'

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'expire_date', headerName: 'Expire Date', width: 200 },
  { field: 'value', headerName: 'Value', width: 100 },
]

export default function IndexPage() {
  const { user } = useContext(AuthContext)
  const history = useHistory()
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
      setBills(bills)
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <Layout title='Index'>
      {error && <ErrorAlert error={error} handleClose={() => setError(null)} />}
      {bills.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {bills.map((bill) => (
            <>
              <ListItem
                secondaryAction={[
                  <IconButton>
                    <EditIcon />
                  </IconButton>,
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>,
                ]}
              >
                <ListItemText
                  primary={`${moment(bill.expire_date).format(
                    'DD/MM/YYYY'
                  )} - ${bill.value} `}
                  secondary={
                    <React.Fragment>{bill.description}</React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          ))}
        </List>
      ) : (
        <Box sx={{mt: 2}}>No bills found, create a new now</Box>
      )}
    </Layout>
  )
}
