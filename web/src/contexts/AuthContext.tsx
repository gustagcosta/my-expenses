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

  const isAuthenticated = !!user

  useEffect(() => {
    const token = window.localStorage.getItem('TOKEN_KEY')

    if (token) {
      window.localStorage.setItem('TOKEN_KEY', token)
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const response = await api.post(`/api/v1/login`, { email, password })

    const { user, token } = response.data

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    window.localStorage.setItem('USER', JSON.stringify(user))
    window.localStorage.setItem('TOKEN_KEY', token)

    setUser(user)

    Router.push('/')
  }

  function logout() {
    window.localStorage.setItem('USER', null)
    window.localStorage.setItem('TOKEN_KEY', null)
    setUser(null)

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
