export const ACCESS_TOKEN = 'accessToken';
export const ROLE = 'role';
export const USERNOTICE_NUMBER = 'notcie_number';
export const setAccessToken = token =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN);
export const setRole = role => localStorage.setItem(ROLE, role);
export const getRole = () => localStorage.getItem(ROLE);
export const getCurrentNoticeNumber = () =>
  localStorage.getItem(USERNOTICE_NUMBER, 1);
export const setCurrentNoticeNumber = page =>
  localStorage.setItem(USERNOTICE_NUMBER, page);
export const currentNoticeNumberRemove = () =>
  localStorage.removeItem(USERNOTICE_NUMBER);
