import { createContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

import { api } from '../services/api'
import { User } from '../interfaces'
import {
  clearStorage,
  getToken,
  getUser,
  storeToken,
  storeUser,
} from '../services/storage'

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

type SignInResponse = {
  token: string
  user: User
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  let isAuthenticated = !!user

  useEffect(() => {
    const token = getToken()
    const user = getUser()

    if (token) {
      storeToken(token)
      setUser(user)
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const response: AxiosResponse<SignInResponse> = await api.post(
        `/api/v1/login`,
        {
          email,
          password,
        }
      )

      const { user, token } = response.data

      storeUser(user)
      storeToken(token)

      setUser(user)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  function logout() {
    clearStorage()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
