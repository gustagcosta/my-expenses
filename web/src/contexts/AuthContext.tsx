import { createContext, useEffect, useState } from 'react'
import Router from 'next/router'

import { api } from '../services/api'
import { User } from '../interfaces'

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  let isAuthenticated = !!user

  useEffect(() => {
    const token = window.localStorage.getItem('TOKEN_KEY')
    const user = JSON.parse(window.localStorage.getItem('USER'))

    if (token) {
      window.localStorage.setItem('TOKEN_KEY', token)
      setUser(user)
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await api.post(`/api/v1/login`, { email, password })

      const { user, token } = response.data

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      window.localStorage.setItem('USER', JSON.stringify(user))
      window.localStorage.setItem('TOKEN_KEY', token)

      setUser(user)

      Router.push('/')
    } catch (error) {
      throw new Error(error)
    }
  }

  function logout() {
    window.localStorage.setItem('USER', null)
    window.localStorage.setItem('TOKEN_KEY', null)
    setUser(null)
    Router.push('/sign-in')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
