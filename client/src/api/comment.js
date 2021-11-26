import http from '@/api/http';

const empty = noticeBoardId => {
  if (!noticeBoardId) throw new Error('noticeBoardId empty');
};

export function select(page = 1, limit = 10, noticeBoardId) {
  empty(noticeBoardId);
  return http.get(
    `/api/comments/?page=${page}&limit=${limit}&noticeBoardId=${noticeBoardId}`
  );
}

export function insert(data) {
  return http.post(`/api/comments`, data);
}

export function selectById(noticeBoardId) {
  empty(noticeBoardId);
  return http.get(`/api/comments/${noticeBoardId}`);
}

export function deleteById(noticeBoardId) {
  empty(noticeBoardId);
  return http.delete(`/api/comments/${noticeBoardId}`);
}

export function modifyById(noticeBoardId, data) {
  empty(noticeBoardId);
  return http.patch(`/api/comments/${noticeBoardId}`, data);
}
