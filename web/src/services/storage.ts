import { User } from '../interfaces'

export const getToken = () => localStorage.getItem('TOKEN_KEY')

export const getUser = () => JSON.parse(localStorage.getItem('USER') as string)

export const storeToken = (token: string) =>
  localStorage.setItem('TOKEN_KEY', token)

export const storeUser = (user: User) =>
  localStorage.setItem('USER', JSON.stringify(user))

export const clearStorage = () => {
  localStorage.removeItem('TOKEN_KEY')
  localStorage.removeItem('USER')
}
