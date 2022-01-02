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
  expire_date: string
  value: string
  description: string
}

type Props = {
  open: boolean
  handleClose: () => void
  reload: () => void
  edit?: boolean
  bill?: Bill
}

export default function BillDialog({
  open,
  handleClose,
  reload,
  edit = null,
  bill = null,
}: Props) {
  const [expireDate, setExpireDate] = useState<Date | null>(new Date())
  const [error, setError] = useState<String | null>('')
  const [value, setValue] = useState<String | null>('')
  const [description, setDescription] = useState<String | null>('')

  useEffect(() => {
    if (edit) {
      setExpireDate(new Date(bill.expire_date))
      setValue(bill.value)
      setDescription(bill.description)
    }
  }, [edit, bill])

  const handleSave = async () => {
    setError('')

    let expireDateParse = format(expireDate, 'yyyyMMdd')

    const method = edit ? 'PUT' : 'POST'

    const body = edit
      ? {
          id: bill.id,
          expire_date: expireDateParse,
          value,
          description,
        }
      : {
          expire_date: expireDateParse,
          value,
          description,
        }

    const response = await api(`/api/v1/bills`, method, body)

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
        <DialogTitle>{edit ? 'Update Bill' : 'Create Bill'}</DialogTitle>
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
          <Button onClick={handleSave}>{edit ? 'Save' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
