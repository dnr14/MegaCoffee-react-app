import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAccessToken } from './utils/localstorege';

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRouter;

const isLogin = () => !!getAccessToken();
