import axios from 'axios'
import { getToken } from './storage'

export function getAPIClient(ctx?: any) {
  const token = getToken()

  const api = axios.create({
    baseURL: 'http://localhost:3333',
  })

  if (token) {
    if (api.defaults.headers != undefined) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`
    }
  }
  
  return api
}
