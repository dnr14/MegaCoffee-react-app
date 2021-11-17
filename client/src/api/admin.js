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

export function menuInsert(formData) {
  return http.post('/api/admin/menu', formData);
}
export function menuSelect(page = 1, limit = 10, category) {
  if (category) {
    return http.get(
      `/api/admin/menu?page=${page}&limit=${limit}&category=${category}`
    );
  }
  return http.get(`/api/admin/menu?page=${page}&limit=${limit}`);
}

export function menuDelete(id) {
  return http.delete(`/api/admin/menu/${id}`);
}
