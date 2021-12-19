import { getToken } from './storage'

async function api(url: string, method: string, body: object) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const token = getToken()

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${url}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })

  return response
}

export { api }
