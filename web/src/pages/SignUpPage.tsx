import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Layout from '../components/Layout'
import { useHistory } from 'react-router'
import ErrorAlert from '../components/ErrorAlert'
import { api } from '../services/api'

export default function SignUp() {
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  async function handleSignUp({ name, email, password }) {
    setError('')

    const response = await api(`/api/v1/register`, 'POST', {
      name,
      email,
      password,
    })

    if (response.status == 200) {
      if (window.confirm('register success, redirect to login?')) {
        history.push('/sign-in')
      }
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <Layout title={'Register'}>
      <div className='container mx-auto'>
        <div className='text-2xl mt-3'>Sign up</div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleSignUp)}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <input
                {...register('name')}
                id='name'
                name='name'
                type='text'
                autoComplete='text'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Name'
              />
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                {...register('email')}
                id='email-address'
                name='email'
                type='text'
                autoComplete='text'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                {...register('password')}
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
              />
            </div>
          </div>
          <div>{error && <ErrorAlert error={error} />}</div>
          <div>
            <button
              type='submit'
              className='group relative w-1/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LockClosedIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
