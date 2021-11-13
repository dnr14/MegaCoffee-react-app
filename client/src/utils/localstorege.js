const ACCESS_TOKEN = 'accessToken';
const ROLE = 'role';
export const setAccessToken = token =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN);
export const setRole = role => localStorage.setItem(ROLE, role);
export const getRole = () => localStorage.getItem(ROLE);
