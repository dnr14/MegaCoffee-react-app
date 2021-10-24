import http from '@/api/http';

export function insert(data) {
  return http.post('/api/users/', data);
}

export function userInfo() {
  return http.get('/api/users/me');
}

export function userUpdate(id, formData) {
  return http.patch(`/api/users/${id}`, formData);
}
