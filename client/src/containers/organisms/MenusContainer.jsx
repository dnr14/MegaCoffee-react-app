import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { MenuContext } from './MenuContextProvider';
import Menu from '@/components/molecules/Menu';
import Test from '@/components/atoms/Test';

let timer;

const MenusContainer = () => {
  const history = useHistory();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [popUpCloseEvent, setPopUpCloseEvent] = useState(null);
  const [clicked, setClicked] = useState(null);
  const { list } = useContext(MenuContext);
  const { results } = list;

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

  useEffect(() => {
    if (params.id) setIsOpen(true);
  }, [params]);

  const menuList = results?.map(menu => (
    <div key={menu.id} style={{ overflow: 'hidden' }}>
      <Menu menu={menu} historyMove={historyMove} />
      {params.id === menu.id && isOpen && (
        <Test
          isOpen={isOpen}
          openDelay={500}
          closeDelay={300}
          setIsOpen={setIsOpen}
          up={up}
        >
          <div>
            <div>상세 설명</div>
            <INFO dangerouslySetInnerHTML={{ __html: menu.body }} />
          </div>
        </Test>
      )}
    </div>
  ));

  return (
    <>
      <div>{menuList}</div>
    </>
  );
};

const IMG = styled.img`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`;

const IMGBOX = styled.div`
  position: relative;
  padding: 100px 0 0 0;
  width: 100px;
`;

const INFO = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default MenusContainer;
