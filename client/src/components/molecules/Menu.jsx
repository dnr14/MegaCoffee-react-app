import React, { memo } from 'react';
import styled from 'styled-components';

const Menu = ({ menu, historyMove, handleMenuDelete, children }) => {
  const { title, id, thumbnail, temperature, category } = menu;
  return (
    <MenuContainer>
      <FloxBox>
        <div onClick={historyMove(id)}>
          <div className="img-box">
            <img src={thumbnail} alt="menu-img" />
          </div>
        </div>
        <ProductInfo>
          <div>
            <span>상품명</span>
            <span>{title}</span>
          </div>
          <div>
            <span>상품 온도</span>
            <span>{temperature}</span>
          </div>
          <div>
            <span>상품 종류</span>
            <span>{category}</span>
          </div>
        </ProductInfo>
        <ProductDelete>
          <span onClick={handleMenuDelete(id)}>delete</span>
        </ProductDelete>
      </FloxBox>
      {children}
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  .img-box {
    position: relative;
    padding: 100px 0 0 0;
    width: 100px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    gap: 5px;
    flex: 1;
    align-items: center;
  }
  & > div > span:first-child {
    width: 100px;
  }

  & > div > span:last-child {
    font-weight: bold;
  }
`;

const ProductDelete = styled.div`
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FloxBox = styled.div`
  margin: 20px 0;
  box-sizing: border-box;
  display: flex;
  gap: 10px;

  span {
    font-size: 0.7rem;
  }
`;

export default memo(Menu);
