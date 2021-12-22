import index from '@modules/login/index';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

const rootReducer = {
  login: index,
};

export const customHistory = createBrowserHistory();

export default configureStore({
  reducer: rootReducer,
  devTools: NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: { history: customHistory } },
      serializableCheck: false,
    }),
});
