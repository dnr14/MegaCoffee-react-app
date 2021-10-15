import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '@/pages/Home/Home';
import MemberShip from './pages/MemberShip/MemberShip';

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/membership" component={MemberShip} exact />
    </Switch>
  );
};

export default Routers;
