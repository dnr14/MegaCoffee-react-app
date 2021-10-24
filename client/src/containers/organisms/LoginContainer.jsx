import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from '@/hooks/useForm';
import Error from '@/components/atoms/Error';
import Relative from '@/components/molecules/Relative';
import { emptyCheck } from '@/utils/validations';
import Modal from '@/components/atoms/Modal';
import useFetch from '@/hooks/useFetch';
import { login } from '@/api/auth';
import Loading from '@/components/atoms/Loading';
import LoginLabel from '@/components/molecules/LoginLabel';
import LoginInput from '@/components/molecules/LoginInput';
import LoginButton from '@/components/molecules/LoginButton';
import LoginForm from '@/components/molecules/LoginForm';
import { userInfoAsync } from '@/modules/login';
import { setAccessToken } from '@/utils/localstorege';

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
      const { access_token: accseeToken } = data;
      setAccessToken(accseeToken);
      dispatch(userInfoAsync());
      history.push('/');
    }
  }, [success, history, form, dispatch]);

  return (
    <>
      <Loading loading={loading} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {message}
      </Modal>
      <LoginForm onSubmit={handleSubmit}>
        {els.map((el, idx) => (
          <div key={idx}>
            <LoginLabel htmlFor={el.props.id}>{el.name}</LoginLabel>
            <Relative>
              <LoginInput {...el.props} />
              {form[el.props.id].data && (
                <Relative.Cancel id={el.props.id} onClick={handleClick} />
              )}
            </Relative>
            {form[el.props.id].error && (
              <Error>{form[el.props.id].error}</Error>
            )}
          </div>
        ))}
        <div>
          <LoginButton
            disabled={
              !id.data || !pwd.data || pwd.error || id.error ? true : false
            }
          >
            로그인
          </LoginButton>
        </div>
      </LoginForm>
    </>
  );
};

export default LoginContainer;
