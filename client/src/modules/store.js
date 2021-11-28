import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { loginReducer } from './login';

const enhancer =
  NODE_ENV === 'production'
    ? compose(applyMiddleware(ReduxThunk))
    : composeWithDevTools(applyMiddleware(ReduxThunk));

const rootReducer = combineReducers({
  login: loginReducer,
});

export const store = createStore(rootReducer, enhancer);
