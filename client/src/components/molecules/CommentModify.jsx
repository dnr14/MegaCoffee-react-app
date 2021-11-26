import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import styled, { css } from 'styled-components';

const CommentModify = (
  { isOpen, closeDelay, openDelay, setIsOpen, children },
  ref
) => {
  const close = useRef(false);
  const [visible, setVisible] = useState(false);
  const OPENDELAY = useMemo(() => openDelay, [openDelay]);
  const CLOSEELAY = useMemo(() => closeDelay, [closeDelay]);

  const modalClose = useCallback(() => {
    setVisible(false);
    close.current = true;
  }, []);

  useImperativeHandle(ref, () => modalClose);

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), OPENDELAY);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), CLOSEELAY);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen, OPENDELAY, CLOSEELAY]);

  return <CommentsContainer visible={visible}>{children}</CommentsContainer>;
};

const CommentsOpenCss = css`
  opacity: 1;
  height: 150px;
`;

const CommentsCloseCss = css`
  padding: 0;
  transition: height 0.3s, padding 0.3s, opacity 0.25s ease-in;
`;
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  height: 0;
  padding: 1rem 0;
  transition: height 1s, opacity 0.25s ease-in;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;

  span {
    font-size: 0.7rem;
  }

  & > div:last-child {
    display: flex;
    justify-content: flex-end;

    & > span {
      display: inline-block;
      padding: 0.5rem 0.3rem;
      cursor: pointer;
      background-color: ${({ theme }) => theme.color.magacoffeColor1};
      color: ${({ theme }) => theme.color.white1};
      box-shadow: ${({ theme }) => theme.boxShadow1};
      font-weight: bold;
      transition: color 0.25s ease-in-out;
      border-radius: 5px;
      &:hover {
        color: ${({ theme }) => theme.color.black1};
      }
    }

    ${({ theme }) => theme.media.tab} {
      font-size: 0.7rem;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.6rem;
    }
    ${({ theme }) => theme.media.mobileS} {
      font-size: 0.5rem;
    }
  }

  ${({ visible }) => visible && CommentsOpenCss}
  ${({ visible }) => !visible && CommentsCloseCss}
`;

export default forwardRef(CommentModify);
