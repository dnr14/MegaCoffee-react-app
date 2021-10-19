import http from '@/api/http';

export const login = (id, pwd) => http.post('/api/auth/login', { id, pwd });
