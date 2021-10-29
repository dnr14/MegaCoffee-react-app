import http from '@/api/http';

export const login = (id, pwd) => http.post('/api/auth/login', { id, pwd });
export const findID = (email, birthDay) =>
  http.post('/api/auth/find/id', {
    email,
    birthDay,
  });

export const findPwd = (id, email, birthDay) =>
  http.post('/api/auth/find/pwd', {
    id,
    email,
    birthDay,
  });
