import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { menuSelect } from '@/api/admin';

const NoticeBoardInsertContainer = () => {
  const [list, setList] = useState([]);
  const [width] = useState(1000);
  const count = useRef(1);
  const ulRef = useRef();
  const slideStop = useRef(false);

  const light = () => {
    const lis = ulRef.current.childNodes;
    count.current += 1;
    if (count.current > lis.length - 1) {
      count.current = lis.length - 1;
    }

    lis.forEach(el => {
      el.style.transform = `translateX(-${100 * count.current}%)`;
    });

    if (count.current === lis.length - 1) {
      ulRef.current.childNodes.forEach(el => {
        setTimeout(() => {
          el.style.transition = '0ms';
          el.style.transform = `translateX(-${0}%)`;
          setTimeout(() => {
            // el.style.transform = `translateX(-${100}%)`;
            el.style.transition = '0.8s';
            count.current = 0;
          }, 100);
        }, 900);
      });
    }
  };

  const left = () => {
    const lis = ulRef.current.childNodes;
    count.current -= 1;

    if (count.current < 0) {
      count.current = 0;
    }

    lis.forEach(el => {
      el.style.transform = `translateX(-${100 * count.current}%)`;
    });

    if (count.current === 0) {
      const last = lis.length - 1;

      ulRef.current.childNodes.forEach(el => {
        setTimeout(() => {
          el.style.transition = '0ms';
          el.style.transform = `translateX(-${last * 100}%)`;
          setTimeout(() => {
            el.style.transition = '0.8s';
            count.current = last;
          }, 100);
        }, 900);
      });
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
      }, 1500);
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
      }, 1500);
      left();
    };
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (!slideStop.current) {
  //       slideStop.current = true;
  //       light();
  //       // interval 도중 클릭 시 무시 하도록 하기위해
  //       setTimeout(() => {
  //         slideStop.current = false;
  //       }, [1000]);
  //     }
  //   }, 4000);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    const page = 1;
    const limit = 100;

    (async () => {
      const { data } = await menuSelect(page, limit);
      const { results } = data;

      // console.log(newArray);

      // Array.from({ length: 60 }).map((_, i) => {
      //   const index = Math.floor(i / 10);
      //   const result = results[i] ? results[i] : {};
      //   return makeArray[index].push({ ...result });
      // });

      // data.results.forEach((element, idx) => {
      //   const index = Math.floor(idx / 10);
      //   makeArray[index].push(element);
      // });

      // data.results.reduce((acc, cur, idx) => {
      //   const index = Math.floor(idx / 10);
      //   acc[index].push(cur);
      //   return acc;
      // }, newArray);

      // const array = [
      //   [1, 'red'],
      //   [2, 'orange'],
      //   [3, 'yellow'],
      //   [4, 'green'],
      // ];
      // const [first, second] = newArray;
      // const last2 = newArray[newArray.length - 1];
      // const last1 = newArray[newArray.length - 2];
      // const n = newArray.concat([first]);
      // setList(array.concat([first]));
      // newArray.unshift(last1);
      // newArray.unshift(last2);
      // newArray.push(first);
      // newArray.push(second);

      const newArray = [];
      results.forEach((el, idx) => {
        const index = Math.floor(idx / 10);
        if (newArray[index]) {
          newArray[index].push(el);
        } else {
          newArray[index] = [];
          newArray[index].push(el);
        }
      });

      // const newArray = [
      //   [1, 'red'],
      //   [2, 'orange'],
      //   [3, 'yellow'],
      //   [4, 'green'],
      //   [5, 'red'],
      // ];
      const [frist] = newArray;
      newArray.push(frist);

      setList(newArray);
      ulRef.current.style.width = `${newArray.length * width}px`;
    })();
  }, []);

  console.log(list);

  return (
    <div>
      <SlideWrapper width={width}>
        <ul ref={ulRef}>
          {/* {list.map(([a, b], idx) => {
            return (
              <li key={idx} className={b}>
                {a}
              </li>
            );
          })} */}
          {list.map((rows, idx) => (
            <li key={idx}>
              {rows.map(cols => {
                return (
                  <div key={cols.id}>
                    <div>
                      <img src={cols.thumbnail} alt="thumb" />
                    </div>
                    <div>{cols.title}</div>
                    <div>{cols.category}</div>
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      </SlideWrapper>
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
    transition: transform 0.8s ease-in-out;
    transform: translateX(-100%);
    float: left;
    display: flex;
    gap: 5px;

    & > div {
      padding: 0.5rem 0.3rem;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      width: 10%;
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
  .red {
    background-color: red;
  }
  .orange {
    background-color: orange;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
`;

export default NoticeBoardInsertContainer;
