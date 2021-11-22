import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { menuSelect } from '@/api/admin';

const SLIDE_INTERVAL_TIME = 4000;
const STR_TRANSITION_TIEM = '0.8s';
const SLIDE_BTN_TIME = 1500;

const NoticeBoardInsertContainer = () => {
  const [list, setList] = useState([]);
  const [defaultWidth] = useState(1000);
  const count = useRef(1);
  const slideRef = useRef();
  const slideStop = useRef(false);

  // 이동 시킬 요소
  // 슬라이드 index 초기화
  const moving = (el, value, slideIndex) => {
    setTimeout(() => {
      el.style.transition = '0ms';
      setTranslateX(el, value);
      setTimeout(() => {
        el.style.transition = STR_TRANSITION_TIEM;
        count.current = slideIndex;
      }, 100);
    }, 900);
  };

  const setTranslateX = (el, xValue) => {
    el.style.transform = `translateX(-${100 * xValue}%)`;
  };

  const light = () => {
    const $lis = slideRef.current.childNodes;
    const slideLastIndex = $lis.length - 1;
    const beforIndex = count.current;
    count.current += 1;
    if (count.current > slideLastIndex) count.current = slideLastIndex;
    $lis.forEach(el => setTranslateX(el, count.current));

    if (count.current === slideLastIndex) {
      $lis.forEach(el => moving(el, 0, 0));
    }
    if (beforIndex === slideLastIndex) {
      $lis.forEach(el => setTimeout(() => setTranslateX(el, 1, 1), 1200));
    }
  };

  const left = () => {
    const $lis = slideRef.current.childNodes;
    const slideLastIndex = $lis.length - 1;
    count.current -= 1;
    if (count.current < 0) count.current = 0;

    $lis.forEach(el => setTranslateX(el, count.current));

    if (count.current === 0) {
      $lis.forEach(el => moving(el, slideLastIndex, slideLastIndex));
    }
  };

  const slideLightMove = () => {
    let throttling;
    return () => {
      // interval 도중에 클릭 시 리턴
      if (slideStop.current) return;
      // 버튼 연속으로 클릭 시 제어 , 클릭시 인터벌 동작 x
      if (throttling) return;
      slideStop.current = true;
      throttling = setTimeout(() => {
        throttling = null;
        slideStop.current = false;
      }, SLIDE_BTN_TIME);
      light();
    };
  };

  const slideLeftMove = () => {
    let throttling;
    return () => {
      // interval 도중에 클릭 시 리턴
      if (slideStop.current) return;
      // 버튼 연속으로 클릭 시 제어 , 클릭시 인터벌 동작 x
      if (throttling) return;
      slideStop.current = true;
      throttling = setTimeout(() => {
        throttling = null;
        slideStop.current = false;
      }, SLIDE_BTN_TIME);
      left();
    };
  };

  // 슬라이드 자동 회전
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (!slideStop.current) {
  //       slideStop.current = true;
  //       light();
  //       // interval 도중 클릭 시 무시 하도록 하기위해
  //       setTimeout(() => {
  //         slideStop.current = false;
  //       }, 1000);
  //     }
  //   }, SLIDE_INTERVAL_TIME);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    const page = 1;
    const limit = 100;
    // 하나의 슬라이드에 몇개의 컬럼을 보여줄지 정한다.
    const COL_COUNT = 10;

    (async () => {
      const { data } = await menuSelect(page, limit);
      const { results } = data;
      const slideArray = [];
      results.forEach((el, idx) => {
        const index = Math.floor(idx / COL_COUNT);
        if (slideArray[index]) {
          slideArray[index].push(el);
        } else {
          slideArray[index] = [];
          slideArray[index].push(el);
        }
      });
      slideArray.push(slideArray[0]);
      setList(slideArray);
      slideRef.current.style.width = `${slideArray.length * defaultWidth}px`;
    })();
  }, [defaultWidth]);

  return (
    <div>
      <SlideWrapper width={defaultWidth} translateTime={STR_TRANSITION_TIEM}>
        <ul ref={slideRef}>
          {list.map((rows, idx) => (
            <li key={idx}>
              {rows.map(cols => (
                <div key={cols.id}>
                  <div>
                    <img src={cols.thumbnail} alt="thumb" />
                  </div>
                  <div>{cols.title}</div>
                  <div>{cols.category}</div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </SlideWrapper>
      {/* 수정 해야된다. */}
      <button type="button" onClick={slideLeftMove()}>
        왼쪽
      </button>
      <button type="button" onClick={slideLightMove()}>
        오른쪽
      </button>
    </div>
  );
};

const SlideWrapper = styled.div`
  width: ${({ width = 1000 }) => `${width}px`};
  margin: 0 auto;
  overflow: hidden;
  ul {
    float: left;
  }
  li {
    width: ${({ width = 1000 }) => `${width}px`};
    transition: transform ${({ translateTime }) => translateTime} ease-in-out;
    transform: translateX(-100%);
    float: left;
    display: flex;
    gap: 5px;

    & > div {
      padding: 0.5rem 0.3rem;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      width: 20%;
      height: 150px;
      overflow: hidden;
      align-items: center;
      justify-content: center;

      & > div {
        font-size: 0.7rem;
        word-break: break-all;
      }

      img {
        width: 100%;
      }
    }
  }
`;

export default NoticeBoardInsertContainer;
