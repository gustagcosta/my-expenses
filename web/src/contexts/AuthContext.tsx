import { createContext, useEffect, useState } from 'react'
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
  user: User
  signIn: (data: SignInData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(getUser())

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await api(`/api/v1/login`, 'POST', {
        email,
        password,
      })

      if (response.status === 200) {
        const { user, token } = await response.json()

        storeUser(user)
        storeToken(token)

        setUser(user)
      } else {
        const error = await response.json()
        throw error.message
      }
    } catch (error) {
      throw error
    }
  }

  function logout() {
    clearStorage()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
