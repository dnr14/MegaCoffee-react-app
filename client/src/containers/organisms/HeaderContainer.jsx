import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/molecules/Header';
import HeaderNav from '@/components/molecules/HeaderNav';
import HeaderTitle from '@/components/molecules/HeaderTitle';
import Profile from '@/components/molecules/Profile';

const HeaderContainer = () => {
  const [toggle, setToggle] = useState(false);
  const state = useSelector(state => state.loginReducer);
  const { accessToken, isLogin, id, name } = state;

  const handleClick = useCallback(e => {
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) setToggle(prev => !prev);
  }, []);
  const handleChange = useCallback(() => setToggle(prev => !prev), []);

  const links = [{ path: '/', name: 'HOME' }];
  if (accessToken === null) {
    links.push(
      ...[
        { path: '/login', name: '로그인' },
        { path: '/membership', name: '회원가입' },
      ]
    );
  }

  const profile = useMemo(
    () => isLogin && <Profile id={id} name={name} />,
    [id, name, isLogin]
  );

  return (
    <Header>
      <HeaderNav
        links={links}
        toggle={toggle}
        isLogin={isLogin}
        handleClick={handleClick}
        handleChange={handleChange}
      >
        {profile}
      </HeaderNav>
      <HeaderTitle />
      {profile}
    </Header>
  );
};

export default HeaderContainer;
