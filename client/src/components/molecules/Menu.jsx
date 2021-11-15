import React, { memo } from 'react';
import styled from 'styled-components';

const Menu = ({ menu, historyMove }) => {
  return (
    <>
      <FLEXBOX>
        <div style={{ cursor: 'pointer' }} onClick={historyMove(menu.id)}>
          <IMGBOX>
            <IMG src={menu.thumbnail} alt="menu-img" />
          </IMGBOX>
        </div>
        <div>
          <div>{menu.title}</div>
          <div>{menu.temperature}</div>
          <div>{menu.category}</div>
        </div>
      </FLEXBOX>
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

const INFO = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(Menu);
