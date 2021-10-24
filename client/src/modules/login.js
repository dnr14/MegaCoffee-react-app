import { userInfo } from '@/api/users';
import { getAccessToken, removeToken } from '@/utils/localstorege';

export const TOKEN_ADD = 'TOKEN_ADD';
export const USER_INFO_ADD = 'USER_INFO_ADD';
export const USER_INFO_REMOVE = 'USER_INFO_REMOVE';

const init = {
  id: null,
  name: null,
  email: null,
  birthDay: null,
  nickName: null,
  path: null,
  isLogin: false,
  accessToken: null,
};

export const tokenAddAction = token => ({
  type: TOKEN_ADD,
  token,
});

export const userInfoRemove = () => ({ type: USER_INFO_REMOVE });

export const userInfoAddAction = userInfo => ({
  type: USER_INFO_ADD,
  userInfo,
});

export const userInfoAsync = () => async dispatch => {
  dispatch(tokenAddAction(getAccessToken()));
  try {
    const response = await userInfo();
    const { data } = response;
    dispatch(userInfoAddAction(data.userInfo));
  } catch (error) {
    removeToken();
  }
};

export const loginReducer = (state = init, action) => {
  switch (action.type) {
    case TOKEN_ADD:
      return {
        ...state,
        accessToken: action.token,
      };
    case USER_INFO_ADD:
      return {
        ...state,
        ...action.userInfo,
        isLogin: true,
      };
    case USER_INFO_REMOVE:
      return {
        ...init,
      };
    default:
      return state;
  }
};
