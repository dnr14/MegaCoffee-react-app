import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '@/pages/Main/MainPage';
import MemberShip from '@/containers/templates/MemberShip';
import Login from '@/containers/templates/Login';
import Welcome from '@/containers/templates/Welcome';
import Logout from '@/containers/templates/Logout';
import UserInfo from '@/containers/templates/UserInfo';
import Find from '@/containers/templates/Find';
import RootRedirect from './RootRedirect';
import AdminRouter from './Routers/AdminRouter';
import PublicRouter from './Routers/PublicRouter';
import PrivateRouter from './Routers/PrivateRouter';
import AdminPage from './pages/Admin/AdminPage';
import CategoryPage from './pages/Category/CategoryPage';

const Routers = () => {
  return (
    <Switch>
      <Route path="/find" component={Find} />
      <Route path="/category" component={CategoryPage} />
      <PublicRouter path="/login" component={Login} restricted />
      <PublicRouter path="/memberShip" component={MemberShip} restricted />
      <PrivateRouter path="/logout" component={Logout} restricted />
      <PrivateRouter path="/info" component={UserInfo} restricted />
      <AdminRouter path="/admin" component={AdminPage} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/" component={MainPage} exact />
      <RootRedirect />
    </Switch>
  );
};

export default Routers;
