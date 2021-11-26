import http from './http';

export function select(page = 1, limit = 10) {
  return http.get(`/api/noticeBoard?page=${page}&limit=${limit}`);
}
export function selectById(id) {
  return http.get(`/api/noticeBoard/${id}`);
}

export function insert(data) {
  return http.post('/api/noticeBoard', data);
}

export function deleteById(id) {
  return http.delete(`/api/noticeBoard/${id}`);
}

export function modify(id, data) {
  return http.patch(`/api/noticeBoard/${id}`, data);
}
