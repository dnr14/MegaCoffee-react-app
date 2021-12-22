import { Redirect, Route } from 'react-router-dom';

import { getAccessToken } from '@/utils/localstorege';

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};
const isAuthenticated = () => !!getAccessToken();

export default PrivateRouter;
