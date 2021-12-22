import { Redirect, Route } from 'react-router-dom';

import { getAccessToken } from '@/utils/localstorege';

const PublicRouter = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated() && restricted ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

export default PublicRouter;
