import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RootRedirect = () => {
  return (
    <Route>
      <Redirect to="/" />
    </Route>
  );
};

export default RootRedirect;
