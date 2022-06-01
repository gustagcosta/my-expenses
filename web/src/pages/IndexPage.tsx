import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { DataGrid } from '@mui/x-data-grid'
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
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { format, toDate } from 'date-fns'

import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import ErrorAlert from '../components/ErrorAlert'
import BillDialog from '../components/BillDialog'
import DeleteBillDialog from '../components/DeleteBillDialog'

export default function IndexPage() {
  const { user, logout } = useContext(AuthContext)

  const history = useHistory()

  const [bills, setBills] = useState([])
  const [error, setError] = useState(null)
  const [newBill, setNewBill] = useState(false)
  const [editBill, setEditBill] = useState(false)
  const [deleteBill, setDeleteBill] = useState(false)
  const [bill, setBill] = useState(null)

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
    } else if (response.status === 401) {
      logout()
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <Layout title='Index'>
      {error && <ErrorAlert error={error} handleClose={() => setError(null)} />}
      <div>
        <Button
          onClick={() => setNewBill(true)}
          variant='contained'
          sx={{ display: 'inline-block', mt: 1, ml: 2 }}
        >
          New
        </Button>
      </div>
      {bills.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {bills.map((bill) => {
            const date = format(new Date(bill.expire_date), 'dd/MM/yyyy')
            return (
              <ListItem
                key={bill.id}
                secondaryAction={[
                  <IconButton>
                    <EditIcon
                      onClick={() => {
                        setEditBill(true)
                        setBill(bill)
                      }}
                    />
                  </IconButton>,
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        setDeleteBill(true)
                        setBill(bill)
                      }}
                    />
                  </IconButton>,
                ]}
              >
                <ListItemText
                  primary={`${date} - ${bill.value} R$ `}
                  secondary={
                    <React.Fragment>{bill.description}</React.Fragment>
                  }
                />
              </ListItem>
            )
          })}
        </List>
      ) : (
        <Box sx={{ mt: 2 }}>No bills found, create a new now</Box>
      )}
      {newBill && (
        <BillDialog
          reload={() => loadBills()}
          open={newBill}
          handleClose={() => setNewBill(false)}
        />
      )}

      {editBill && (
        <BillDialog
          reload={() => loadBills()}
          open={editBill}
          bill={bill}
          edit={true}
          handleClose={() => setEditBill(false)}
        />
      )}

      {deleteBill && (
        <DeleteBillDialog
          reload={() => loadBills()}
          open={deleteBill}
          bill={bill}
          handleClose={() => setDeleteBill(false)}
        />
      )}
    </Layout>
  )
}
