import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Test = ({ isOpen, closeDelay, openDelay, setIsOpen, up, children }) => {
  const [visible, setVisible] = useState(false);
  const close = useRef(false);
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
    <AlertContainer onClick={modalClose} visible={visible}>
      {children}
    </AlertContainer>
  );
};

const AlertOpenCss = css`
  opacity: 1;
  height: 100px;
`;

const AlertCloseCss = css`
  transition: height 0.3s, opacity 0.25s ease-in;
`;
const AlertContainer = styled.div`
  cursor: pointer;
  opacity: 0;
  height: 0;
  transition: height 1s, opacity 0.25s ease-in;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;

  ${({ visible }) => visible && AlertOpenCss}
  ${({ visible }) => !visible && AlertCloseCss}
 
  & > div {
    display: flex;
    gap: 10px;
    flex-direction: column;
    line-height: 1.5;
    padding: 1rem;
    padding-right: 3rem;
    &.green {
      background: rgb(18, 184, 134);
    }
    &.red {
      background: #e74c3c;
    }
  }
`;

export default Test;
