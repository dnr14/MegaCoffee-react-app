import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAccessToken } from './utils/localstorege';

const PublicRouter = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const isLogin = () => {
  return !!getAccessToken();
};

export default PublicRouter;
