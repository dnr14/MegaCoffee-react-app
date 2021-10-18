import http from '@/api/http';

export function insert(data) {
  return http.post('/api/users/', data);
}
