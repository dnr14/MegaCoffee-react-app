import http from '@/api/http';

export function insert(data) {
  return http.post('/api/users/', data);
}

export function userInfo() {
  return http.get('/api/users/me');
}
