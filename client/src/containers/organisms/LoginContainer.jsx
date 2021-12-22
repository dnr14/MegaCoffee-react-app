import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '@/api/auth';

import Error from '@/components/atoms/Error';
import Loading from '@/components/atoms/Loading';
import Modal from '@/components/atoms/Modal';
import LoginButton from '@/components/molecules/LoginButton';
import LoginForm from '@/components/molecules/LoginForm';
import LoginInput from '@/components/molecules/LoginInput';
import LoginLabel from '@/components/molecules/LoginLabel';
import Relative from '@/components/molecules/Relative';

import useFetch from '@/hooks/useFetch';
import useForm from '@/hooks/useForm';

import { userInfoAsync } from '@/modules/login';

import { setAccessToken, setRole } from '@/utils/localstorege';
import { emptyCheck } from '@/utils/validations';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, handleChange, handleClick } = useForm(false);
  const { state, callApi } = useFetch();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const { id, pwd } = form;
  const { loading, success, error } = state;

  const messages = useMemo(
    () => [
      <>
        <div>
          <span>에러가 있습니다.</span>
        </div>
        <div>
          <span>수정 해주세요.</span>
        </div>
      </>,
      <>
        <div>
          <span>빈칸이 있습니다.</span>
        </div>
        <div>
          <span>모두 채워주세요.</span>
        </div>
      </>,
    ],
    []
  );

  const els = [
    {
      name: '아이디',
      props: {
        id: 'id',
        type: 'text',
        placeholder: '아이디를 입력해주세요.',
        value: id.data,
        error: id.error,
        onChange: handleChange,
      },
    },
    {
      name: '패스워드',
      props: {
        id: 'pwd',
        type: 'password',
        placeholder: '패스워드를 입력해주세요.',
        value: pwd.data,
        error: pwd.error,
        onChange: handleChange,
      },
    },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const { id, pwd } = form;
    if (id.error || pwd.error) {
      setMessage(messages[0]);
      setIsOpen(prevState => !prevState);
      return;
    }
    if (emptyCheck(id.data) || emptyCheck(pwd.data)) {
      setMessage(messages[1]);
      setIsOpen(prevState => !prevState);
      return;
    }

    callApi(() => login(id.data, pwd.data));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      setMessage(
        <>
          <span>{error.message}</span>
        </>
      );
      setIsOpen(prevState => !prevState);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const { data } = success;
      const { access_token: accseeToken, role } = data;
      setAccessToken(accseeToken);
      setRole(role);
      dispatch(userInfoAsync());
    }
  }, [success, history, form, dispatch]);

  return (
    <>
      <Loading loading={loading} />
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          {message}
        </Modal>
      )}
      <LoginForm onSubmit={handleSubmit}>
        {els.map((el, idx) => (
          <div key={idx}>
            <LoginLabel htmlFor={el.props.id}>{el.name}</LoginLabel>
            <Relative>
              <LoginInput {...el.props} />
              {form[el.props.id].data && <Relative.Cancel id={el.props.id} onClick={handleClick} />}
              {form[el.props.id].error && <Error>{form[el.props.id].error}</Error>}
            </Relative>
          </div>
        ))}
        <div>
          <LoginButton disabled={loading || !id.data || !pwd.data || pwd.error || id.error ? true : false}>
            로그인
          </LoginButton>
        </div>
      </LoginForm>
    </>
  );
};

export default LoginContainer;
