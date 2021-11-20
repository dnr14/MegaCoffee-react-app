import http from './http';

export function select(page = 1, limit = 10) {
  return http.get(`/api/noticeBoard?page=${page}&limit=${limit}`);
}
