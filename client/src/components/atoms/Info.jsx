import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Info = ({ isOpen, closeDelay, openDelay, setIsOpen, up, children }) => {
  const close = useRef(false);
  const [visible, setVisible] = useState(false);
  const OPENDELAY = useMemo(() => openDelay, [openDelay]);
  const CLOSEELAY = useMemo(() => closeDelay, [closeDelay]);

  const modalClose = () => {
    setVisible(false);
    close.current = true;
  };

  useEffect(() => up(modalClose), [up]);

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), OPENDELAY);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), CLOSEELAY);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen, OPENDELAY, CLOSEELAY]);

  return (
    <InfoContainer onClick={modalClose} visible={visible}>
      {children}
    </InfoContainer>
  );
};

const InfoOpenCss = css`
  opacity: 1;
  height: 100px;
`;

const InfoCloseCss = css`
  transition: height 0.3s, opacity 0.25s ease-in;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  opacity: 0;
  height: 0;
  transition: height 1s, opacity 0.25s ease-in;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;

  ${({ visible }) => visible && InfoOpenCss}
  ${({ visible }) => !visible && InfoCloseCss}

  .info {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: 0.7rem;
  }
`;

export default Info;
