import React, { memo } from 'react';
import styled from 'styled-components';
import FormLabel from '@/components/FormLabel';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Form from '@/components/Form';
import useForm from '@/hooks/useForm';
import Error from '@/components/Error';
import Cancel from '@/components/Cancel';

const LoginContainer = () => {
  const { form, handleChange, handleClick, dispatch } = useForm(false);
  const { id, pwd } = form;

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

  return (
    <LoginForm>
      {els.map((el, idx) => {
        return (
          <div key={idx}>
            <LoginLabel htmlFor={el.props.id}>{el.name}</LoginLabel>
            <div style={{ position: 'relative' }}>
              <LoginInput {...el.props} />
              {form[el.props.id].data && (
                <Cancel id={el.props.id} onClick={handleClick} />
              )}
            </div>
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
