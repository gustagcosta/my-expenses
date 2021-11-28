import axios from 'axios'

export function getAPIClient(ctx?: any) {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('TOKEN_KEY')

    const api = axios.create({
      baseURL: 'http://localhost:3333',
    })

    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api
  }
}
