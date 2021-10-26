import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userInfoRemoveAction } from '@/modules/login';
import { removeToken } from '@/utils/localstorege';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    removeToken();
    dispatch(userInfoRemoveAction());
    history.push('/');
  }, [dispatch, history]);

  return null;
};

export default Logout;
