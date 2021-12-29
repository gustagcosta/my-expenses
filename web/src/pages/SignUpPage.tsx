import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
import { useHistory } from 'react-router'
import ErrorAlert from '../components/ErrorAlert'
import { api } from '../services/api'

export default function SignUp() {
  const [error, setError] = useState(null)
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const { user, signIn } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [])

  async function handleSignUp({ name, email, password }) {
    setError('')

    const response = await api(`/api/v1/register`, 'POST', {
      name,
      email,
      password,
    })

    if (response.status === 200) {
      await signIn({ email, password })
      history.push('/')
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <Layout title={'Login'}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit(handleSignUp)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
            {...register('name')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            {...register('email')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            {...register('password')}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid width={'100%'}>
            {error && (
              <ErrorAlert error={error} handleClose={() => setError(null)} />
            )}
          </Grid>
        </Box>
      </Box>
    </Layout>
  )
}
