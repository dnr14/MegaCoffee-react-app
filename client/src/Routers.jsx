import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import MemberShip from '@/containers/templates/MemberShip';
import Login from '@/containers/templates/Login';
import Welcome from '@/containers/templates/Welcome';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import Logout from '@/containers/templates/Logout';
import UserInfo from '@/containers/templates/UserInfo';

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <PublicRouter path="/login" component={Login} restricted />
      <PublicRouter path="/memberShip" component={MemberShip} restricted />
      <PrivateRouter path="/logout" component={Logout} restricted />
      <PrivateRouter path="/info" component={UserInfo} restricted />
      <Route path="/welcome" component={Welcome} />
    </Switch>
  );
};

export default Routers;
