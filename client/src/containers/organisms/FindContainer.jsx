import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RootRedirect from '@/RootRedirect';
import useForm from '@/hooks/useForm';
import FindForm from '@/components/molecules/FindForm';

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

  const handleFindIdSubmit = e => {
    e.preventDefault();
    console.log('아이디 찾기 ', e);
  };
  const handleFindPasswordSubmit = e => {
    e.preventDefault();
    console.log('비밀번호 찾기 ', e);
  };

  return (
    <>
      <Switch>
        <Route path={`${match.path}/id`}>
          <FindForm els={els[0]} handleFindSubmit={handleFindIdSubmit} />
        </Route>
        <Route path={`${match.path}/pwd`}>
          <FindForm els={els[1]} handleFindSubmit={handleFindPasswordSubmit} />
        </Route>
        <RootRedirect />
      </Switch>
    </>
  );
};

export default FindContainer;
