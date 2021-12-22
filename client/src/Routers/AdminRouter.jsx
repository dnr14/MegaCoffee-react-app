import { getAccessToken, getRole } from '@utils/localstorege';
import { Redirect, Route } from 'react-router-dom';

const AdminRouter = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (isAdmin() ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

const isAdmin = () => isAuthenticated() && isRole() === 'admin';
const isAuthenticated = () => !!getAccessToken();
const isRole = () => getRole();

export default AdminRouter;
