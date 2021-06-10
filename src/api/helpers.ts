import { CORS_ANYWHERE } from './contants';

export function cors(url: string): string {
  return CORS_ANYWHERE + '/' + url;
}
