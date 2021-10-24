import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userInfoRemove } from '@/modules/login';
import { removeToken } from '@/utils/localstorege';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    removeToken();
    dispatch(userInfoRemove());
    history.push('/');
  }, [dispatch, history]);

  return null;
};

export default Logout;
