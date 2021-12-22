import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Menu from '@/components/molecules/Menu';
import Info from '@/components/atoms/Info';
import Button from '@/components/atoms/Button';
import useFetch from '@/hooks/useFetch';
import { menuSelect, menuDelete } from '@/api/admin';
import Loading from '@/components/atoms/Loading';
import Alert from '@/components/atoms/Alert';
import { MenuContext } from './MenuContextProvider';

let timer;

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

  const up = useCallback(close => setPopUpCloseEvent({ close }), []);

  const historyMove = id => () => {
    if (id === clicked && isOpen) return;
    if (timer) clearTimeout(timer);
    if (params.id && popUpCloseEvent) popUpCloseEvent.close();
    timer = setTimeout(() => {
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
    <Menu
      key={menu.id}
      menu={menu}
      historyMove={historyMove}
      handleMenuDelete={handleMenuDelete}
    >
      {MenuId === menu.id && isOpen && (
        <Info
          isOpen={isOpen}
          openDelay={500}
          closeDelay={300}
          setIsOpen={setIsOpen}
          up={up}
        >
          <div>상세 설명</div>
          <div
            dangerouslySetInnerHTML={{ __html: menu.body }}
            className="info"
          />
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
      <div>
        <div>상품 이미지를 클릭 시 상세 설명이 나옵니다.(*)</div>
        <div>
          <span>total {list?.totalResults}개</span>
        </div>
        {menuList}
        <Button
          type="button"
          onClick={handleHasMoreMenu}
          disabled={list.page === list.totalPages}
        >
          더보기
        </Button>
      </div>
    </>
  );
};

export default MenusContainer;
