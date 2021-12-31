import { MenuContext } from './MenuContextProvider';
import { menuSelect, menuDelete } from '@/api/admin';
import Alert from '@/components/atoms/Alert';
import Button from '@/components/atoms/Button';
import Info from '@/components/atoms/Info';
import Loading from '@/components/atoms/Loading';
import Menu from '@/components/molecules/Menu';
import useFetch from '@/hooks/useFetch';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const MenusContainer = () => {
  const history = useHistory();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [popUpCloseEvent, setPopUpCloseEvent] = useState(null);
  const [clicked, setClicked] = useState(null);
  const { state, callApi } = useFetch();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { list, setList } = useContext(MenuContext);
  const { results } = list;
  const { loading, error, success } = state;
  const MenuId = params.id;
  const timerRef = useRef(null);

  const up = useCallback(close => setPopUpCloseEvent({ close }), []);

  const historyMove = id => () => {
    if (id === clicked && isOpen) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (params.id && popUpCloseEvent) popUpCloseEvent.close();
    timerRef.current = setTimeout(() => {
      history.push(`/admin/menu/${id}`);
      setClicked(id);
    }, 400);
  };

  const handleHasMoreMenu = () => {
    if (list.page === list.totalPages) return;
    callApi(() => menuSelect(list.page + 1));
  };
  const handleMenuDelete = id => () => {
    callApi(() => menuDelete(id));
  };

  useEffect(() => {
    if (params.id) setIsOpen(true);
  }, [params]);

  useEffect(() => {
    if (error) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>서버에서 에러가 발생했습니다.</span>
        </div>
      );
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const { results } = success.data;
      if (results) {
        setList(prevList => ({
          ...prevList,
          results: [...prevList.results, ...results],
          page: success.data.page,
        }));
      } else if (!results) {
        setList(prevList => ({
          ...prevList,
          results: prevList.results.filter(list => list.id !== success.data.id),
        }));
        setAlertOpen(true);
        setAlertMessage(
          <div className="green">
            <span>메뉴가 삭제되었습니다.</span>
          </div>
        );
      }
    }
  }, [success, setList]);

  const menuList = results?.map(menu => (
    <Menu key={menu.id} menu={menu} historyMove={historyMove} handleMenuDelete={handleMenuDelete}>
      {MenuId === menu.id && isOpen && (
        <Info isOpen={isOpen} openDelay={500} closeDelay={300} setIsOpen={setIsOpen} up={up}>
          <div>상세 설명</div>
          <div dangerouslySetInnerHTML={{ __html: menu.body }} className="info" />
        </Info>
      )}
    </Menu>
  ));

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Loading loading={loading} />
      <Wrapper>
        <div>
          상품 이미지를 클릭 시 상세 설명이 나옵니다.<span className="red">(*)</span>
        </div>
        <div>
          <span>총 {list?.totalResults}개의 메뉴가 등록되어있습니다.</span>
        </div>
        {menuList}
        <Button type="button" onClick={handleHasMoreMenu} disabled={list.page === list.totalPages}>
          더보기
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .the-red {
    color: red;
  }
`;

export default MenusContainer;
