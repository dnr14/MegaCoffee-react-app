import http from './http';

export function users(page = 1, limit = 10) {
  return http.get(`/api/admin/users?limit=${limit}&page=${page}`);
}
export function userUpdate(data) {
  return http.patch(`/api/admin/users`, data);
}
export function userSearch(id) {
  return http.get(`/api/admin/users/${id}`);
}
