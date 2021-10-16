import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '@/pages/Home/Home';
import MemberShip from './pages/MemberShip/MemberShip';
import Login from './pages/Login/Login';

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/membership" component={MemberShip} />
    </Switch>
  );
};

export default Routers;
