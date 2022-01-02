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
import { useState } from 'react'

import ErrorAlert from './ErrorAlert'
import { api } from '../services/api'
import { format } from 'date-fns'

type Props = {
  open: boolean
  handleClose: () => void
  reload?: () => void
}

export default function BillDialog({ open, handleClose, reload }: Props) {
  const [expireDate, setExpireDate] = useState<Date | null>(new Date())
  const [error, setError] = useState<String | null>('')
  const [value, setValue] = useState<String | null>('')
  const [description, setDescription] = useState<String | null>('')

  const handleCreate = async () => {
    setError('')

    let expireDateParse = format(expireDate, 'yyyyMMdd')

    const response = await api(`/api/v1/bills`, 'POST', {
      expire_date: expireDateParse,
      value,
      description,
    })

    if (response.status === 200) {
      resetState()
      handleClose()
      reload()
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  const resetState = () => {
    setValue('')
    setDescription('')
    setExpireDate(null)
    setError('')
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create a new bill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin='dense'
            id='value'
            label='Value'
            type='text'
            fullWidth
            variant='standard'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Expire Date'
              value={expireDate}
              onChange={(newValue) => {
                setExpireDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <div style={{ padding: '15px' }}>
          {error && (
            <ErrorAlert error={error} handleClose={() => setError(null)} />
          )}
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
