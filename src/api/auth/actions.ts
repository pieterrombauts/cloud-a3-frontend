import axios from 'axios'
import { API_GATEWAY_URL, CORS_ANYWHERE } from '../contants'
import { persistAuthToken, withAuth } from './tokens'

// LOGIN

interface LoginResponse {
  token: string
}

export async function login(email: string, password: string) {
  const { data } = await axios.post<LoginResponse>(
    CORS_ANYWHERE + '/' + API_GATEWAY_URL + '/login',
    {
      email,
      password,
    },
  )
  persistAuthToken(data.token)
}

// REGISTER

interface RegisterResponse {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function register(userData: RegisterRequest) {
  await axios.post<RegisterResponse>(
    CORS_ANYWHERE + '/' + API_GATEWAY_URL + '/register',
    {
      ...userData,
    },
  )
}

export async function me() {
  return await withAuth(axios).get(API_GATEWAY_URL + '/me')
}
