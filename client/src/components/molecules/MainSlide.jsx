import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MainSlide = ({ list }) => {
  const [slideList] = useState(list);
  const [slideCheckedNumber, setSlideCheckedNumber] = useState(0);
  const [width, setWidth] = useState(0);
  const slideRef = useRef();
  const divRef = useRef();

  const checked = useCallback(
    id => () => {
      const setTranslateX = (el, xValue) => {
        el.style.transform = `translateX(-${100 * xValue}%)`;
      };

      const $lis = slideRef.current.childNodes;
      $lis.forEach(el => setTranslateX(el, id));
      setSlideCheckedNumber(id);
    },
    []
  );

  useEffect(() => {
    let throttling;
    const resize = () => {
      if (throttling) return;
      throttling = setTimeout(() => {
        const { clientWidth } = divRef.current;
        setWidth(clientWidth);
        throttling = null;
      }, 100);
    };
    window.addEventListener('resize', resize);
    setWidth(divRef.current.clientWidth);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    setWidth(divRef.current.clientWidth);
  }, []);

  const lis = slideList.map((rows, idx) => (
    <li key={idx}>
      {rows.map((cols, idx) => (
        <MainSlideContainer key={idx}>
          <img src={cols} alt="thumbnail" />
        </MainSlideContainer>
      ))}
    </li>
  ));

  const buttons = slideList.map((rows, idx) => (
    <li key={idx}>
      {rows.map((_, colsIdx) => (
        <span
          key={colsIdx}
          onClick={checked(idx)}
          className={idx === slideCheckedNumber ? 'checked' : ''}
        />
      ))}
    </li>
  ));

  return (
    <div ref={divRef}>
      <MainSlideWrapper
        width={width}
        ulWidth={width * slideList.length}
        translateTime={500}
      >
        <ul ref={slideRef}>{lis}</ul>
        <MainSlideButtonContainer>
          <ul>{buttons}</ul>
        </MainSlideButtonContainer>
      </MainSlideWrapper>
    </div>
  );
};

const MainSlideWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: ${({ width = 0 }) => `${width}px`};
  & > ul {
    float: left;
    width: ${({ ulWidth = 0 }) => `${ulWidth}px`};

    & > li {
      width: ${({ width = 0 }) => `${width}px`};
      transition: transform ${({ translateTime }) => `${translateTime}ms`}
        ease-in-out;
      transform: translateX(0%);
      height: 680px;
      float: left;
      display: flex;
      flex-wrap: wrap;

      ${({ theme }) => theme.media.tab} {
        height: 500px;
      }
      ${({ theme }) => theme.media.mobile} {
        height: 300px;
      }
    }
  }
`;

const MainSlideContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const MainSlideButtonContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5%;
  ul {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  li {
  }

  span {
    width: 11px;
    height: 11px;
    display: block;
    background-color: #666;
    border-radius: 50%;
    cursor: pointer;

    ${({ theme }) => theme.media.mobile} {
      width: 15px;
      height: 15px;
    }
  }
  span.checked {
    background-color: yellow;
  }
`;

export default MainSlide;
