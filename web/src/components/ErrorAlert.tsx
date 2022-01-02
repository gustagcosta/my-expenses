import { Alert, AlertColor, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const ErrorAlert = ({ type = 'error' as AlertColor, error, handleClose }) => {
  return (
    <Alert
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          size='small'
          onClick={handleClose}
        >
          <CloseIcon fontSize='inherit' />
        </IconButton>
      }
      severity={type}
    >
      {error}
    </Alert>
  )
}

export default ErrorAlert
