import { users, userUpdate } from '@/api/admin';
import Button from '@/components/atoms/Button';
import Loading from '@/components/atoms/Loading';
import TableBody from '@/components/atoms/TableBody';
import RoleMenubar from '@/components/molecules/RoleMenubar';
import StateMenuBar from '@/components/molecules/StateMenuBar';
import UsersTable from '@/components/molecules/UsersTable';
import useFetch from '@/hooks/useFetch';
import queryString from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

const INIT = {
  posts: [],
  pageState: {},
};

const UsersContainer = () => {
  const [list, setList] = useState(INIT);
  const { state, callApi } = useFetch();
  const location = useLocation();
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState('');
  const { loading, error, success } = state;
  const { posts, pageState } = list;
  const { page, totalPages } = pageState;
  const currentQuery = useMemo(() => queryString.parse(location.search), [location]);

  const handleUserStateChange = useCallback(
    (currentState, userId) =>
      ({ target }) => {
        const { id } = target;
        if (id !== currentState) callApi(() => userUpdate({ id: userId, state: id }));
      },
    [callApi]
  );

  const handleUserRoleStateChange = useCallback(
    (currentRole, userId) =>
      ({ target }) => {
        const { id } = target;
        if (id !== currentRole) callApi(() => userUpdate({ id: userId, role: id }));
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

  const handleModalFoucsBlur = e => {
    if (e.defaultPrevented) return;
    setIsStateModalOpen(false);
    setIsRoleModalOpen(false);
  };

  const handleAddUsers = () => {
    if (page !== totalPages) {
      callApi(() => users(page + 1));
    }
  };

  // ============================ useEffect =============================

  useEffect(() => {
    users().then(response => {
      const { results, limit, page, totalPages, totalResults } = response.data;
      setList({
        posts: results,
        pageState: {
          limit,
          page,
          totalPages,
          totalResults,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (success) {
      const { results } = success.data;

      // 유저정보를 추가로 가져왔을때
      if (results) {
        setList(({ posts, pageState }) => ({
          posts: [...posts, ...results],
          pageState: {
            ...pageState,
            page: pageState.page + 1,
          },
        }));

        // 유저정보를 수정 했을때
      } else if (!results) {
        const user = success.data;
        setList(({ posts, pageState }) => ({
          posts: posts.map(post => (post.id === user.id ? user : post)),
          pageState,
        }));
      }
    }
  }, [success]);

  useEffect(() => {}, [error]);
  // ============================ useEffect =============================

  return (
    <div>
      <Loading loading={loading} />
      <UsersTable heads={heads} onClick={handleModalFoucsBlur}>
        {posts &&
          sort(posts, currentQuery).map(({ id, email, birthDay, role, state }, idx) => (
            <TableBody key={idx}>
              <div>{idx + 1}</div>
              <div>{id}</div>
              <div>{email}</div>
              <div>{birthDay}</div>
              <div>{ROLE_EUNM[role]}</div>
              <RoleMenubar
                id={id}
                role={role}
                ROLE_EUNM={ROLE_EUNM}
                clickedId={clickedId}
                isRoleModalOpen={isRoleModalOpen}
                setIsRoleModalOpen={setIsRoleModalOpen}
                handleAdminModalClick={handleAdminModalClick}
                handleUserRoleStateChange={handleUserRoleStateChange}
              />
              <div className={state}>{STATE_ENUM[state]}</div>
              <StateMenuBar
                id={id}
                state={state}
                STATE_ENUM={STATE_ENUM}
                clickedId={clickedId}
                isStateModalOpen={isStateModalOpen}
                setIsStateModalOpen={setIsStateModalOpen}
                handleUserStateChange={handleUserStateChange}
                handleStateModalClick={handleStateModalClick}
              />
            </TableBody>
          ))}
        <div>{page !== totalPages && <Button onClick={handleAddUsers}>더보기</Button>}</div>
      </UsersTable>
    </div>
  );
};

const sort = (data, currentQuery) => {
  const { keyword, alignment } = currentQuery;
  let result = data;

  if (keyword && alignment) {
    if (alignment === 'desc') {
      result = data.sort((a, b) => (a[keyword] > b[keyword] ? 1 : -1));
    } else {
      result = data.sort((a, b) => (a[keyword] < b[keyword] ? 1 : -1));
    }
  }

  return result;
};

export default UsersContainer;
