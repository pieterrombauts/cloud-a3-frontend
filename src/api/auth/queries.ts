import { API_GATEWAY_URL, CORS_ANYWHERE } from 'api/contants';
import axios from 'axios';
import { withAuth } from './tokens';

export interface SatOptionType {
  favourite?: boolean;
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  favSatellites: SatOptionType[];
  avatar: string;
}

export async function me() {
  const { data } = await withAuth(axios).get<User>(API_GATEWAY_URL + '/me');
  return data;
}
