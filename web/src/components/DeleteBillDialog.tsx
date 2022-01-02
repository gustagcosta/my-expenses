import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { useEffect, useState } from 'react'

import ErrorAlert from './ErrorAlert'
import { api } from '../services/api'
import { format } from 'date-fns'

type Bill = {
  id: string
}

type Props = {
  open: boolean
  handleClose: () => void
  reload: () => void
  bill: Bill
}

export default function DeleteBillDialog({ open, handleClose, reload, bill }: Props) {
  const [error, setError] = useState<String | null>('')

  const handleConfirm = async () => {
    setError('')

    const response = await api(`/api/v1/bills/${bill.id}`, 'DELETE')

    if (response.status === 200) {
      handleClose()
      reload()
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{'Delete Bill'}</DialogTitle>
        <DialogContent>
          <div style={{ padding: '15px' }}>
            Are you sure you want to delete this account? this action is
            permanently
          </div>
          <div style={{ padding: '15px' }}>
            {error && (
              <ErrorAlert error={error} handleClose={() => setError(null)} />
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
