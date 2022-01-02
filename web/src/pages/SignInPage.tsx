import { Box, Button, TextField, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { useHistory, Link as LinkRouter } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'

import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
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
          sx={isBrowser ? { mt: 1, width: '70%' } : { mt: 1, width: '90%' }}
          noValidate
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
          <Link href='/sign-up' variant='body2'>
            <LinkRouter
              to='/sign-up'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {"Don't have an account? Sign Up"}
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
