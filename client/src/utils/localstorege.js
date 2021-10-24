const ACCESS_TOKEN = 'accessToken';
export const setAccessToken = token =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN);
