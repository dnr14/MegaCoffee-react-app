import { userSearch, userUpdate } from '@/api/admin';
import Loading from '@/components/atoms/Loading';
import TableBody from '@/components/atoms/TableBody';
import Title from '@/components/atoms/Title';
import RoleMenubar from '@/components/molecules/RoleMenubar';
import Search from '@/components/molecules/Search';
import StateMenuBar from '@/components/molecules/StateMenuBar';
import UsersTable from '@/components/molecules/UsersTable';
import useFetch from '@/hooks/useFetch';
import useForm, { idAddAction } from '@/hooks/useForm';
import { useCallback, useEffect, useState } from 'react';

const STATE_ENUM = {
  normal: '정상',
  delete: '삭제',
  stop: '정지',
};

const ROLE_EUNM = {
  admin: '관리자',
  user: '사용자',
};

const heads = ['번호', '아이디', '이메일', '생년월일', '권한', '권한 관리', '상태', '관리'];

const UsersSearchConatiner = () => {
  const { form, handleChange, handleClick, dispatch } = useForm(false);
  const { state, callApi } = useFetch();
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState('');
  const [result, setResult] = useState(null);
  const { loading, success, error } = state;

  const els = [
    {
      name: '아이디',
      props: {
        id: 'id',
        type: 'text',
        placeholder: '아이디를 입력해주세요.',
        value: form.id.data,
        error: form.id.error,
        onChange: handleChange,
        onClick: handleClick,
        isSignup: true,
      },
    },
  ];

  const handleUserRoleStateChange = useCallback(
    (currentRole, userId) =>
      ({ target }) => {
        const { id } = target;
        if (id !== currentRole) callApi(() => userUpdate({ id: userId, role: id }));
      },
    [callApi]
  );

  const handleUserStateChange = useCallback(
    (currentState, userId) =>
      ({ target }) => {
        const { id } = target;
        if (id !== currentState) callApi(() => userUpdate({ id: userId, state: id }));
      },
    [callApi]
  );

  const handleStateModalClick = id => e => {
    e.preventDefault();
    if (isRoleModalOpen === false) {
      setClickedId(id);
      setIsStateModalOpen(true);
    }
  };

  const handleAdminModalClick = id => e => {
    e.preventDefault();
    if (isStateModalOpen === false) {
      setClickedId(id);
      setIsRoleModalOpen(true);
    }
  };

  const handleUsersSearch = e => {
    const { id } = form;
    e.preventDefault();
    dispatch(idAddAction({ data: '', error: null }));
    callApi(() => userSearch(id.data));
  };

  const handleModalFoucsBlur = e => {
    if (e.defaultPrevented) return;
    setIsStateModalOpen(false);
    setIsRoleModalOpen(false);
  };

  useEffect(() => {
    if (success) {
      const { data } = success;
      setResult(data);
    }
  }, [success]);

  useEffect(() => {}, [error]);

  return (
    <div>
      <Loading loading={loading} />
      <Search els={els} handleUsersSearch={handleUsersSearch} />
      <Title>검색 결과</Title>
      <UsersTable heads={heads} onClick={handleModalFoucsBlur}>
        {result && (
          <TableBody>
            <div>{1}</div>
            <div>{result.id}</div>
            <div>{result.email}</div>
            <div>{result.birthDay}</div>
            <div>{ROLE_EUNM[result.role]}</div>
            <RoleMenubar
              id={result.id}
              role={result.role}
              ROLE_EUNM={ROLE_EUNM}
              isRoleModalOpen={isRoleModalOpen}
              clickedId={clickedId}
              setIsRoleModalOpen={setIsRoleModalOpen}
              handleAdminModalClick={handleAdminModalClick}
              handleUserRoleStateChange={handleUserRoleStateChange}
            />
            <div className={result.state}>{STATE_ENUM[result.state]}</div>
            <StateMenuBar
              id={result.id}
              state={result.state}
              STATE_ENUM={STATE_ENUM}
              isStateModalOpen={isStateModalOpen}
              clickedId={clickedId}
              setIsStateModalOpen={setIsStateModalOpen}
              handleUserStateChange={handleUserStateChange}
              handleStateModalClick={handleStateModalClick}
            />
          </TableBody>
        )}
      </UsersTable>
    </div>
  );
};

export default UsersSearchConatiner;
