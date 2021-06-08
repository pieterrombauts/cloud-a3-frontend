import axios from 'axios'
import { API_GATEWAY_URL } from './contants'

// LOGIN

interface LoginResponse {
  token: string
}

export async function login(email: string, password: string) {
  const { data } = await axios.post<LoginResponse>(API_GATEWAY_URL + '/login', {
    email,
    password,
  })
  return data
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
  const { data } = await axios.post<RegisterResponse>(
    API_GATEWAY_URL + '/register',
    userData,
  )
  return data
}
