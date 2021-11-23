import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SLIDE_INTERVAL_TIME = 4000;
const STR_TRANSITION_TIEM = 'transform 0.8s ease-in-out';
const SLIDE_BTN_TIME = 1000;

const Slide = ({ slideCardClickEevent, list, isLoop }) => {
  const [WIDTH, SET_WIDTH] = useState(0);
  const slideCount = useRef(1);
  const slideRef = useRef();
  const divRef = useRef(null);
  const slideStop = useRef(false);
  const [slideList, setSlideList] = useState([]);
  const [resizeWidth, setResizeWidth] = useState(0);
  const [loop, setIsLoop] = useState(false);

  const setTranslateX = useCallback((el, xValue) => {
    el.style.transform = `translateX(-${100 * xValue}%)`;
  }, []);

  const init = useCallback(() => {
    const $lis = slideRef.current.childNodes;
    $lis.forEach(el => setTranslateX(el, 1));
    slideCount.current = 1;
  }, [setTranslateX]);

  const moving = useCallback(
    (el, value, slideIndex) => {
      setTimeout(() => {
        el.style.transition = '0ms';
        setTranslateX(el, value);
        setTimeout(() => {
          el.style.transition = STR_TRANSITION_TIEM;
          slideCount.current = slideIndex;
        }, 100);
      }, 900);
    },
    [setTranslateX]
  );

  const light = useCallback(() => {
    const $lis = slideRef.current.childNodes;
    const slideLastIndex = $lis.length - 1;
    const beforIndex = slideCount.current;
    slideCount.current += 1;
    if (slideCount.current > slideLastIndex) {
      slideCount.current = slideLastIndex;
    }
    $lis.forEach(el => setTranslateX(el, slideCount.current));

    if (slideCount.current === slideLastIndex) {
      $lis.forEach(el => moving(el, 0, 0));
    }
    if (beforIndex === slideLastIndex) {
      $lis.forEach(el => setTimeout(() => setTranslateX(el, 1, 1), 1200));
    }
  }, [setTranslateX, moving]);

  const left = useCallback(() => {
    const $lis = slideRef.current.childNodes;
    const slideLastIndex = $lis.length - 1;
    slideCount.current -= 1;
    if (slideCount.current < 0) slideCount.current = 0;

    $lis.forEach(el => setTranslateX(el, slideCount.current));

    if (slideCount.current === 0) {
      $lis.forEach(el => moving(el, slideLastIndex, slideLastIndex));
    }
  }, [setTranslateX, moving]);

  const slideLightMove = useCallback(() => {
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
  }, [light]);

  const slideLeftMove = useCallback(() => {
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
  }, [left]);

  // 슬라이드 자동 회전
  useEffect(() => {
    const timer = setInterval(() => {
      if (loop) {
        if (!slideStop.current) {
          slideStop.current = true;
          light();
          // interval 도중 클릭 시 무시 하도록 하기위해
          setTimeout(() => {
            slideStop.current = false;
          }, 500);
        }
      }
    }, SLIDE_INTERVAL_TIME);
    return () => clearInterval(timer);
  }, [slideStop, light, loop]);

  useEffect(() => {
    let throttling;
    const resize = () => {
      if (throttling) return;
      throttling = setTimeout(() => {
        init();
        const { clientWidth } = divRef.current;
        setResizeWidth(clientWidth);
        throttling = null;
      }, 1000);
    };
    window.addEventListener('resize', resize);
    setResizeWidth(divRef.current.clientWidth);
    return () => window.removeEventListener('resize', resize);
  }, [setTranslateX, init]);

  // 리사이즈 될때마다 cols 개수 나누는 문제 해결해야된다.
  // 모바일 사이즈로 될때 첫번째 인덱스 로우가 마지막 인덱스 로우에 안붙는다.
  // 그렇다고 push를 해주면 리사이즈가 일어날때마다 20개 씩 추가가되어서 늘어나버린다.
  // useEffect(() => {
  // setSlideList(prevList => {
  //   let COL_COUNT = 20;
  //   if (resizeWidth < 500) {
  //     COL_COUNT = 6;
  //   } else if (resizeWidth < 800) {
  //     COL_COUNT = 12;
  //   }
  //   if (prevList.length === 0 || resizeWidth === 0) return prevList;
  //   const allRecords = [].concat(...prevList);
  //   console.log(allRecords.length);
  //   const slideArray = [];
  //   allRecords.forEach((el, idx) => {
  //     const index = Math.floor(idx / COL_COUNT);
  //     if (!slideArray[index]) slideArray[index] = [];
  //     slideArray[index].push(el);
  //   });
  //   slideArray.push(slideArray[0]);
  //   return slideArray;
  // });
  // }, [resizeWidth, setSlideList]);

  useEffect(() => {
    slideRef.current.style.width = `${slideList.length * WIDTH}px`;
  }, [slideRef, WIDTH, slideList]);

  useEffect(() => SET_WIDTH(resizeWidth), [resizeWidth]);
  useEffect(() => {
    init();
    setSlideList(list);
  }, [list, setTranslateX, init]);
  useEffect(() => setIsLoop(isLoop), [isLoop]);

  const lis = slideList.map((rows, idx) => (
    <li key={idx}>
      {rows.map(({ id, checked, thumbnail, title, category }, idx) => (
        <SlideContainer key={idx} id={id} onClick={slideCardClickEevent}>
          <div className={checked ? 'checked' : ''}>
            <div className="img-box">
              <img src={thumbnail} alt="thumbnail" />
            </div>
            <div className="contents-box">
              <span>{title}</span>
              <span>{String(category).toUpperCase()}</span>
            </div>
          </div>
        </SlideContainer>
      ))}
    </li>
  ));

  return (
    <div ref={divRef} style={{ marginBottom: '3rem' }}>
      <SlideWrapper width={WIDTH} translateTime={STR_TRANSITION_TIEM}>
        <ul ref={slideRef}>{lis}</ul>
      </SlideWrapper>
      <SlideButtons>
        <button className="left" type="button" onClick={slideLeftMove()}>
          prev
        </button>
        <button className="right" type="button" onClick={slideLightMove()}>
          next
        </button>
      </SlideButtons>
    </div>
  );
};

const SlideWrapper = styled.div`
  position: relative;
  width: ${({ width = 1000 }) => `${width}px`};
  margin: 0 auto;
  overflow: hidden;
  ul {
    float: left;
  }
  li {
    width: ${({ width = 1000 }) => `${width}px`};
    transition: ${({ translateTime }) => translateTime};
    transform: translateX(-100%);
    float: left;
    display: flex;
    flex-wrap: wrap;
  }
`;

const SlideContainer = styled.div`
  width: 20%;
  & > div {
    margin: 0 0.3rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.3rem;
    word-break: break-all;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.boxShadow1};
    border: 1px solid rgba(200, 214, 229, 0.5);
    border-radius: 5px;
    gap: 10px;
  }

  ${({ theme }) => theme.media.tab} {
    width: 25%;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 50%;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
  }

  .img-box {
    position: relative;
    width: 100%;
    padding-top: 200px;
  }
  .contents-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
    ${({ theme }) => theme.media.tab} {
      font-size: 0.7rem;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.6rem;
    }
  }

  & > div:hover,
  .checked {
    background-color: rgba(254, 202, 87, 1);
    color: ${({ theme }) => theme.color.white1};
    font-weight: bold;
  }
`;

const SlideButtons = styled.div`
  position: relative;
  margin-bottom: 1rem;
  button {
    display: inline-block;
    position: absolute;
    top: 0;
    z-index: 1;
    padding: 0.3rem 1rem;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid rgba(200, 214, 229, 0.5);
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.boxShadow1};
    transition: color 0.25s ease-in-out;
    margin: 0 1rem;

    &:hover {
      background-color: rgba(254, 202, 87, 1);
      color: ${({ theme }) => theme.color.white1};
      font-weight: bold;
    }
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`;

export default Slide;
