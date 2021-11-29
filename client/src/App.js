import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Routers from './Routers';
import Top from './containers/templates/Top';
import Bottom from './containers/templates/Bottom';
import { getAccessToken } from './utils/localstorege';
import { userInfoAsync } from './modules/login';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      dispatch(userInfoAsync());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Top />
      <Routers />
      <Bottom />
    </BrowserRouter>
  );
};

export default App;
