import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Test from '@/components/atoms/Test';
import { MenuContext } from './MenuContextProvider';

const MenusContainer = () => {
  const history = useHistory();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [popUpCloseEvent, setPopUpCloseEvent] = useState(null);
  const { list } = useContext(MenuContext);
  const { results } = list;

  const up = useCallback(close => setPopUpCloseEvent({ close }), []);
  const historyMove = id => {
    let timer;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        history.push(`/admin/menu/${id}`);
        timer = null;
      }, 1000);
      popUpCloseEvent.close();
    };
  };

  useEffect(() => {
    if (params.id) {
      setIsOpen(true);
    }
  }, [params]);

  const menuList = results?.map(
    ({ id, thumbnail, body, title, temperature, category }) => (
      <div key={id} style={{ overflow: 'hidden' }}>
        <FLEXBOX>
          <div onClick={historyMove(id)} style={{ cursor: 'pointer' }}>
            <IMGBOX>
              <IMG src={thumbnail} alt="menu-img" />
            </IMGBOX>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: body }} />
            <div>{title}</div>
            <div>{temperature}</div>
            <div>{category}</div>
          </div>
        </FLEXBOX>
        {params.id === id && isOpen ? (
          <Test isOpen={isOpen} setIsOpen={setIsOpen} up={up}>
            1
          </Test>
        ) : null}
      </div>
    )
  );

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
const FLEXBOX = styled.div`
  margin: 20px 0;
  box-sizing: border-box;
  display: flex;

  & > div:last-child {
    flex: 1;
  }
`;

const visibleCss = css`
  height: 100px;
  opacity: 1;
`;
const INFO = styled.div`
  height: 0;
  opacity: 0;
  transition: height 0.5s ease-in;
  ${({ visible }) => visible && visibleCss}
`;

export default MenusContainer;
