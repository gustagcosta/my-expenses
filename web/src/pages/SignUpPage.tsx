import { Button, TextField, Link, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { useHistory, Link as LinkRouter } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'

import ErrorAlert from '../components/ErrorAlert'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
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
          sx={isBrowser ? { mt: 1, width: '70%' } : { mt: 1, width: '90%' }}
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
          <Link variant='body2'>
            <LinkRouter
              to='/sign-in'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {'Already have an account? Sign in'}
            </LinkRouter>
          </Link>
          {error && (
            <ErrorAlert error={error} handleClose={() => setError(null)} />
          )}
        </Box>
      </Box>
    </Layout>
  )
}
