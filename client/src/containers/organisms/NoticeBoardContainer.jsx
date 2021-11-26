import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { select } from '@/api/userNoticeBoard';
import Cards from '@/components/molecules/Cards';
import Card from '@/components/atoms/Card';
import Pagination from '@/components/molecules/Pagination';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/atoms/Loading';
import { getAccessToken } from '@/utils/localstorege';
import Alert from '@/components/atoms/Alert';
import { selectById } from '@/api/comment';
import Empty from '@/components/atoms/Empty';
import { isEmptyObject } from '@/utils/validations';

const USERNOTICE_NUMBER = 'USERNOTICE_NUMBER';

const NoticeBoardContainer = () => {
  const [userNoticeBoard, setUserNoticeBoard] = useState({});
  const { results, totalPages, page } = userNoticeBoard;
  const { state, callApi } = useFetch();
  const { loading, error, success } = state;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handlePageMove = useCallback(
    id => () => {
      if (id !== page) callApi(() => select(id));
    },
    [page, callApi]
  );

  useEffect(() => {
    const page = localStorage.getItem(USERNOTICE_NUMBER, 1) ?? 1;
    callApi(() => select(page));
    return () => localStorage.removeItem(USERNOTICE_NUMBER);
  }, [callApi]);

  useEffect(() => {
    if (success) {
      const { data } = success;
      localStorage.setItem(USERNOTICE_NUMBER, data.page);
      const promiseArray = data.results.map(async result =>
        selectById(result.id)
      );

      const boardArray = data.results;

      (async () => {
        const promiseResult = await Promise.all(promiseArray);
        const commentsArray = promiseResult.map(o => o.data);

        setUserNoticeBoard({
          ...data,
          results: boardArray.map((result, idx) => ({
            ...result,
            comments: commentsArray[idx],
          })),
        });
      })();
    }
  }, [success]);

  useEffect(() => {
    console.log(error);
    if (error) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>서버에서 에러가 발생했습니다.</span>
        </div>
      );
    }
  }, [error]);

  const makePagination = useCallback(
    (page, totalPages) => {
      if (page === undefined || totalPages === undefined) return [];
      if (page === 0 || totalPages === 0) return [];

      const makeSpan = (index, text) => (
        <span
          key={index}
          onClick={handlePageMove(index)}
          className={page === index ? 'current' : ''}
        >
          {text}
        </span>
      );

      const PAGENATION_NUMBER_COUNT = 5;
      const lastPageGroup = Math.ceil(totalPages / PAGENATION_NUMBER_COUNT);
      const currentPageGroup = Math.ceil(page / PAGENATION_NUMBER_COUNT);

      const start = (currentPageGroup - 1) * PAGENATION_NUMBER_COUNT + 1;
      const nextPage = currentPageGroup * PAGENATION_NUMBER_COUNT + 1;
      const prevPage = (currentPageGroup - 1) * PAGENATION_NUMBER_COUNT;

      const length =
        currentPageGroup === lastPageGroup
          ? totalPages + 1 - start
          : PAGENATION_NUMBER_COUNT;

      const pageNationCountArray = Array.from({ length }).map((_, i) => {
        const index = (currentPageGroup - 1) * PAGENATION_NUMBER_COUNT + 1 + i;
        return makeSpan(index, index);
      });

      if (currentPageGroup !== 1) {
        pageNationCountArray.unshift(makeSpan(prevPage, 'prev'));
      }

      if (currentPageGroup !== lastPageGroup) {
        pageNationCountArray.push(makeSpan(nextPage, 'next'));
      }

      return pageNationCountArray;
    },
    [handlePageMove]
  );

  // 첫랜더시 css 높이 잡아는주는 용도

  const cards = results?.map(card => <Card {...card} key={card.id} />);

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Loading loading={loading} />
      <Title>
        <h2>건의 게시판</h2>
        {!!getAccessToken() && (
          <div>
            <Link to="/noticeBoard/insert">
              <span>건의 하기</span>
            </Link>
          </div>
        )}
      </Title>
      {isEmptyObject(userNoticeBoard) ? (
        <>
          <Loading loading={loading} />
          <Empty />
        </>
      ) : (
        <>
          <Cards>{cards}</Cards>
          <Pagination>{makePagination(page, totalPages)}</Pagination>
        </>
      )}
    </>
  );
};

// 분리해줘야된다.
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  span {
    position: relative;
    font-size: 0.7rem;
    transition: color 0.25s ease-in-out;
    cursor: pointer;
    color: rgba(149, 165, 166, 0.8);
    &::after {
      position: absolute;
      content: '';
      border-top: 1px solid black;
      left: 0;
      right: 0;
      height: 1px;
      bottom: -5px;
      opacity: 0;
    }

    &:hover {
      color: black;
      &::after {
        opacity: 1;
      }
    }
  }
`;

export default NoticeBoardContainer;
