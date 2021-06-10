import { API_GATEWAY_URL, CORS_ANYWHERE } from 'api/contants';
import axios from 'axios';
import { withAuth } from './tokens';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export async function me() {
  const { data } = await withAuth(axios).get<User>(API_GATEWAY_URL + '/me');
  return data;
}
