import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const MenuBar = ({ isOpen, setIsOpen, children }) => {
  const [visible, setVisible] = useState(false);
  const close = useRef(false);

  const modalClose = e => {
    e.preventDefault();
    setVisible(false);
    close.current = true;
  };

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), 400);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), 400);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen]);

  return (
    <Menu onClick={modalClose} visible={visible}>
      <MenuWrraper visible={visible}>{children}</MenuWrraper>
    </Menu>
  );
};

const MenuVisible = css`
  z-index: 10;
`;
const MenuWrraperVisible = css`
  opacity: 1;
  transform: scale(1);
`;

const Menu = styled.div`
  position: absolute;
  right: 5%;
  top: 80%;
  z-index: 0;
  transition: z-index 0.25s ease-in;
  ${({ visible }) => visible && MenuVisible}
`;

const MenuWrraper = styled.div`
  margin-top: 0.5rem;
  width: 12rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
  background: white;
  color: rgb(33, 37, 41);
  transform-origin: right top;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s, z-index 0.35s ease-in;
  transform: scale(0);

  ${({ visible }) => visible && MenuWrraperVisible}
  .checked {
    background: ${({ theme }) => theme.color.magacoffeColor1};
    color: ${({ theme }) => theme.color.black1};
  }
`;

export default MenuBar;
