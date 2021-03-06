import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';

export function persistAuthToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function clearAuthToken() {
  localStorage.removeItem('authToken');
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function isLoggedIn() {
  return !!getAuthToken();
}

export function withAuth(axios: AxiosStatic) {
  // axios.interceptors.request.use((config) => {
  //   const token = getAuthToken();
  //   if (token) {
  //     config.headers.Authorization = token;
  //   }
  //   return config;
  // });
  const config: AxiosRequestConfig = {};
  const token = getAuthToken();
  if (token) {
    config.headers = { Authorization: token };
  }
  const instance = axios.create(config);
  return instance;
}
