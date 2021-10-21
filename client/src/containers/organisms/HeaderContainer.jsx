import React, { useCallback, useMemo, useState } from 'react';
import Header from '@/components/molecules/Header';

const HeaderContainer = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = useCallback(e => {
    e.preventDefault();
    if (e.target instanceof HTMLLIElement) setToggle(prev => !prev);
  }, []);
  const handleChange = useCallback(() => setToggle(prev => !prev), []);

  const links = useMemo(
    () => [
      { path: '/', name: 'HOME' },
      { path: '/login', name: '로그인' },
      { path: '/membership', name: '회원가입' },
    ],
    []
  );

  return (
    <Header
      toggle={toggle}
      links={links}
      handleClick={handleClick}
      handleChange={handleChange}
    />
  );
};

export default HeaderContainer;
