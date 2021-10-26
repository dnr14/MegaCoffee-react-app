import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RootRedirect from '@/RootRedirect';
import FindId from '@/components/molecules/FindId';
import FindPassword from '@/components/molecules/FindPassword';
import useForm from '@/hooks/useForm';
import Form from '@/components/atoms/Form';
import LoginButton from '@/components/molecules/LoginButton';

const FindContainer = () => {
  const match = useRouteMatch();
  const { form, handleChange, handleClick } = useForm(false);
  const { id, email, birthDay } = form;

  const els = [
    [
      {
        name: '이메일',
        props: {
          id: 'email',
          type: 'email',
          value: email.data,
          error: email.error,
        },
        handleChange,
        handleClick,
      },
      {
        name: '생년월일',
        props: {
          id: 'birthDay',
          type: 'text',
          value: birthDay.data,
          error: birthDay.error,
        },
        handleChange,
        handleClick,
      },
    ],
    [
      {
        name: '아이디',
        props: {
          id: 'id',
          type: 'text',
          value: id.data,
          error: id.error,
        },
        handleChange,
        handleClick,
      },
      {
        name: '이메일',
        props: {
          id: 'email',
          type: 'email',
          value: email.data,
          error: email.error,
        },
        handleChange,
        handleClick,
      },
      {
        name: '생년월일',
        props: {
          id: 'birthDay',
          type: 'text',
          value: birthDay.data,
          error: birthDay.error,
        },
        handleChange,
        handleClick,
      },
    ],
  ];

  const handleFindIdSubmit = e => {};
  const handleFindPasswordSubmit = e => {};

  return (
    <>
      <Switch>
        <Route path={`${match.path}/id`}>
          <Form onSubmit={handleFindIdSubmit}>
            <FindId els={els[0]} />
            <div>
              <LoginButton>아이디찾기</LoginButton>
            </div>
          </Form>
        </Route>
        <Route path={`${match.path}/password`}>
          <Form onSubmit={handleFindPasswordSubmit}>
            <FindPassword els={els[1]} />
            <div>
              <LoginButton>비밀번호찾기</LoginButton>
            </div>
          </Form>
        </Route>
        <RootRedirect />
      </Switch>
    </>
  );
};

export default FindContainer;
