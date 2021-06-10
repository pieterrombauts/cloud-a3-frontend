import axios from 'axios';
import { useLoginContext } from 'components/login/UserContext';
import { useQueryClient } from 'react-query';
import { API_GATEWAY_URL, CORS_ANYWHERE } from '../contants';
import { clearAuthToken, persistAuthToken, withAuth } from './tokens';

// LOGIN
interface LoginResponse {
  token: string;
}

export async function login(email: string, password: string) {
  const { data } = await axios.post<LoginResponse>(API_GATEWAY_URL + '/login', {
    email,
    password,
  });
  persistAuthToken(data.token);
}

// REGISTER
interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function register(userData: RegisterRequest) {
  await axios.post<RegisterResponse>(API_GATEWAY_URL + '/register', {
    ...userData,
  });
}

export async function forgotPassword(email: string) {
  await axios.post(API_GATEWAY_URL + '/forgotPassword', {
    email,
  });
}

export async function resetPassword(token: string, newPassword: string) {
  await axios.post(API_GATEWAY_URL + '/resetPassword', {
    token,
    newPassword,
  });
}

export function useLogout() {}
