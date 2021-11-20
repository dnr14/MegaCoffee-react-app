import { userInfo } from '@/api/users';
import { getAccessToken, removeToken } from '@/utils/localstorege';

export const TOKEN_ADD = 'TOKEN_ADD';
export const USER_INFO_FATCH = 'USER_INFO_FATCH';
export const USER_INFO_FATCH_ERROR = 'USER_INFO_FATCH';
export const USER_INFO_REMOVE = 'USER_INFO_REMOVE';

const init = {
  id: null,
  name: null,
  email: null,
  birthDay: null,
  nickName: null,
  img: null,
  accessToken: null,
};

export const tokenAddAction = accessToken => ({
  type: TOKEN_ADD,
  accessToken,
});

export const userInfoRemoveAction = () => ({ type: USER_INFO_REMOVE });

export const userInfoFatchAction = userInfo => ({
  type: USER_INFO_FATCH,
  userInfo,
});

export const userInfoAsync = () => async dispatch => {
  dispatch(tokenAddAction(getAccessToken()));
  try {
    const response = await userInfo();
    const { data } = response;
    dispatch(userInfoFatchAction(data.userInfo));
  } catch (error) {
    removeToken();
    dispatch(userInfoRemoveAction());
  }
};

export const loginReducer = (state = init, action) => {
  switch (action.type) {
    case TOKEN_ADD:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case USER_INFO_FATCH:
      return {
        ...state,
        ...action.userInfo,
      };
    case USER_INFO_REMOVE:
      return {
        ...init,
      };
    default:
      return state;
  }
};
