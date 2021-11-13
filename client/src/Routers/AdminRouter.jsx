import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken, getRole } from '../utils/localstorege';

const AdminRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAdmin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const isAdmin = () => {
  return isLogin() && isRole() === 'admin';
};
const isLogin = () => !!getAccessToken();
const isRole = () => getRole();

export default AdminRouter;
