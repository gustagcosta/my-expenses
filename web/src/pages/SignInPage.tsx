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

export default function SignInPage() {
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()
  const { signIn, user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [])

  async function handleSignIn(data: any) {
    try {
      await signIn(data)
      history.push('/')
    } catch (error) {
      console.error(error)
      setError(error)
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
          onSubmit={handleSubmit(handleSignIn)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            {...register('email')}
          />
          <TextField
            {...register('password')}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <ErrorAlert error={error} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  )
}
