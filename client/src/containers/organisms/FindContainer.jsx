import { useEffect, useMemo, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { findID, findPwd } from '@/api/auth';

import Loading from '@/components/atoms/Loading';
import Modal from '@/components/atoms/Modal';
import ReadOnly from '@/components/atoms/ReadOnly';
import Transition from '@/components/atoms/Transition';
import FindForm from '@/components/molecules/FindForm';
import LoginLabel from '@/components/molecules/LoginLabel';
import Result from '@/components/molecules/Result';

import useFetch from '@/hooks/useFetch';
import useForm from '@/hooks/useForm';

import RootRedirect from '@/Routers/RootRedirect';

import { emptyCheck } from '@/utils/validations';

const FindContainer = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const { form, handleChange, handleClick } = useForm(false);
  const { state, callApi } = useFetch();
  const { id, email, birthDay } = form;
  const { loading, error, success } = state;
  const history = useHistory();

  const messages = useMemo(
    () => [
      <>
        <div>
          <span>빈칸이 있습니다.</span>
        </div>
        <div>
          <span>모두 채워주세요.</span>
        </div>
      </>,
      <>
        <div>
          <span>{error?.message}</span>
        </div>
        <div>
          <span>수정 해주세요.</span>
        </div>
      </>,
    ],
    [error]
  );

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
    const emailValue = email.data;
    const birthDayValue = birthDay.data;

    if (emptyCheck(emailValue) || emptyCheck(birthDayValue)) {
      setMessage(messages[0]);
      setIsOpen(prevState => !prevState);
    } else {
      callApi(() => findID(emailValue, birthDayValue));
    }
  };

  const handleFindPasswordSubmit = e => {
    e.preventDefault();
    const idValue = id.data;
    const emailValue = email.data;
    const birthDayValue = birthDay.data;
    if (emptyCheck(idValue) || emptyCheck(emailValue) || emptyCheck(birthDayValue)) {
      setMessage(messages[0]);
      setIsOpen(prevState => !prevState);
    } else {
      callApi(() => findPwd(idValue, emailValue, birthDayValue));
    }
  };

  useEffect(() => {
    if (error) {
      setMessage(messages[1]);
      setIsOpen(prevState => !prevState);
    }
  }, [error, messages]);

  useEffect(() => {
    if (success) {
      const { data } = success;
      const map = new Map();
      map.set('아이디', data.id);
      if (Object.keys(data).length > 1) map.set('패스워드', data.pwd);
      history.push('/find/result', map);
    }
  }, [success, history]);

  useEffect(() => {
    if (location.pathname === `${match.path}/result`) {
      if (!location.state) {
        history.push('/');
      }
    }
  }, [location, match, history]);

  const duration = 1000;

  return (
    <>
      <Loading loading={loading} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {message}
      </Modal>
      <Route
        render={({ location }) => {
          return (
            <Transition duration={duration}>
              <TransitionGroup>
                <CSSTransition timeout={duration} classNames="fade" key={location.key}>
                  <Switch location={location}>
                    <Route path={`${match.path}/id`}>
                      <FindForm els={els[0]} handleFindSubmit={handleFindIdSubmit} />
                    </Route>
                    <Route path={`${match.path}/pwd`}>
                      <FindForm els={els[1]} handleFindSubmit={handleFindPasswordSubmit} />
                    </Route>
                    <Route path={`${match.path}/result`}>
                      <Result>
                        {location.state &&
                          [...location.state].map((value, idx) => (
                            <div key={idx}>
                              <LoginLabel>{value[0]}</LoginLabel>
                              <ReadOnly value={value[1]} />
                            </div>
                          ))}
                      </Result>
                    </Route>
                    <RootRedirect />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </Transition>
          );
        }}
      />
    </>
  );
};

export default FindContainer;
