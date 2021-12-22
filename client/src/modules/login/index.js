import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userInfo } from '@/api/users';

import { getAccessToken, removeToken } from '@/utils/localstorege';

const name = 'login';
// thunk는 condtion ==> padding ==> fullfiled or rejected
// api error는 rejectWithValue로 rejected한태 넘긴다
// 그외 error는 dispatch를 호춯 했던 곳에서 error처리
export const userInfoAsync = createAsyncThunk(`login/userInfoAsync`, async (_, { rejectWithValue }) => {
  try {
    const response = await userInfo();
    return response.data;
  } catch (error) {
    if (error?.response) {
      throw error;
    }
    const message = error.response.data ?? '서버에서 에러가 발생';
    return rejectWithValue(message);
  }
});

// currentRequestId 비동기 고유 id 이걸로 연속 호출을 제어한다.
const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    birthDay: null,
    nickName: null,
    accessToken: null,
  },
  isLoggendIn: false,
  loading: null,
  error: null,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    userInfoRemove: () => initialState,
  },
  extraReducers: {
    [userInfoAsync.pending]: state => {
      state.loading = true;
    },
    [userInfoAsync.fulfilled]: (state, action) => {
      state.loading = null;
      state.isLoggendIn = true;
      state.user = action.payload.userInfo;
      state.user.accessToken = getAccessToken();
    },
    [userInfoAsync.rejected]: (_, action) => {
      const { payload, error } = action;
      removeToken();
      if (payload) {
        return { ...initialState, error: payload };
      }
      return { ...initialState, error: error.message };
    },
  },
});

export const loginSelector = ({ login }) => login;
export const { tokenAdd, userInfoFatch, userInfoRemove } = slice.actions;
export default slice.reducer;
