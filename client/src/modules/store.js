import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import index from './login/index';

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
