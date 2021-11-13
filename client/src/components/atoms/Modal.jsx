import React, { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '@/components/atoms/Button';

const Modal = ({ isOpen, backgroundTransparent, setIsOpen, children }) => {
  const [visible, setVisible] = useState(false);
  const close = useRef(false);

  const modalClose = () => {
    setVisible(false);
    close.current = true;
  };

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), 500);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), 500);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <StyledWrapper
      visible={visible}
      backgroundTransparent={backgroundTransparent}
    >
      <div>
        <div>{children}</div>
        <div>
          <ModelButton onClick={modalClose}>닫기</ModelButton>
        </div>
      </div>
    </StyledWrapper>,
    document.querySelector('#modal')
  );
};

Modal.propTypes = {
  backgroundTransparent: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.35s, z-index 0.35s ease-in;

  ${({ backgroundTransparent, theme }) =>
    backgroundTransparent
      ? css`
          background-color: transparent;
        `
      : css`
          background-color: ${theme.color.shadowColor};
        `};

  ${({ visible }) =>
    visible &&
    css`
      z-index: 1;
      opacity: 1;
    `}

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform 0.5s ease-in;
    transform: translateY(100px);

    width: 20rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.magacoffeColor1};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.shadowColor};
    ${({ visible }) =>
      visible &&
      css`
        transform: translateY(-100px);
        z-index: 1;
        opacity: 1;
      `};

    & > div {
      color: ${({ theme }) => theme.color.black1};
      font-weight: 600;
      text-align: center;
      line-height: 2rem;
    }

    ${({ theme }) => theme.media.mobile} {
      width: 10rem;
    }
  }
`;

const ModelButton = styled(Button)`
  background-color: #fff;
  color: ${({ theme }) => theme.color.black1};
`;

export default memo(Modal);
