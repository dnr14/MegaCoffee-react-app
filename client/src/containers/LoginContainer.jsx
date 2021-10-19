import React, { memo, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FormLabel from '@/components/FormLabel';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Form from '@/components/Form';
import useForm from '@/hooks/useForm';
import Error from '@/components/Error';
import Relative from '@/components/Relative';
import { emptyCheck } from '@/utils/validations';
import Modal from '@/components/Modal';
import useFetch from '@/hooks/useFetch';
import { login } from '@/api/auth';
import Loading from '@/components/Loading';

const LoginContainer = () => {
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
          <div>{error.message}</div>
        </>
      );
      setIsOpen(prevState => !prevState);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      history.push('/home');
    }
  }, [success, history, form]);

  return (
    <>
      <Loading loading={loading} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {message}
      </Modal>
      <LoginForm onSubmit={handleSubmit}>
        {els.map((el, idx) => {
          return (
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
          );
        })}
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

const LoginForm = styled(Form)`
  margin: 0;
  gap: 0;
  & > div {
    margin-top: 1rem;

    & > span {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.7rem;
    }
  }
`;

const LoginInput = memo(styled(FormInput)`
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-radius: 0;
  padding-left: 0;
  padding-right: 2rem;

  margin-top: 0.3rem;
  &::placeholder {
    font-size: 0.7rem;
    letter-spacing: 0;
  }
`);
const LoginLabel = memo(styled(FormLabel)`
  letter-spacing: 0;
`);

const LoginButton = memo(styled(Button)`
  letter-spacing: 0;
  border-radius: ${({ theme }) => theme.borderRadius1};
  background-color: ${({ theme }) => theme.color.coffee1};
`);

export default LoginContainer;
