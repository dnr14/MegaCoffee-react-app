import React, { useCallback, useEffect, useState } from 'react';
import { select } from '@/api/userNoticeBoard';
import useFetch from '@/hooks/useFetch';
import Alert from '@/components/atoms/Alert';
import { selectById } from '@/api/comment';
import CardsBox from '../../components/molecules/CardsBox';
import {
  getCurrentNoticeNumber,
  setCurrentNoticeNumber,
} from '@/utils/localstorege';
import Pagination from '@/components/molecules/Pagination';
import { emptyCheck } from '@/utils/validations';
import Card from '@/components/atoms/Card';

const NoticeBoardContainer = () => {
  const [noticeState, setNoticeState] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { state, callApi } = useFetch();
  const { results, totalPages, page } = noticeState;
  const { loading, error, success } = state;

  // 페이지네이션 번호 클릭 시 페이지 호출
  const handleNextPage = useCallback(
    id => () => {
      if (id !== page) {
        setNoticeState(prev => ({
          ...prev,
          results: null,
        }));
        callApi(() => select(id));
      }
    },
    [page, callApi]
  );

  // 컴포넌트 첫 랜더링 시
  useEffect(() => {
    const firstRenderPage = getCurrentNoticeNumber() ?? 1;
    callApi(() => select(firstRenderPage));
  }, [callApi]);

  // 페이지네이션 번호 클릭 후 응답
  useEffect(() => {
    try {
      if (emptyCheck(success)) return;
      if (!success.data) throw new Error('data is notfound');

      const { data } = success;
      const { page, results } = data;

      setCurrentNoticeNumber(page);
      const promiseArray = results.map(async ({ id }) => selectById(id));
      (async () => {
        const promiseResult = await Promise.all(promiseArray);
        const commentsArray = promiseResult.map(({ data }) => data);
        const newResults = results.map((result, idx) => ({
          ...result,
          comments: commentsArray[idx],
        }));
        setNoticeState({ ...data, results: newResults });
      })();
    } catch (error) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>서버응답은 성공했지만 에러가 발생했습니다.</span>
        </div>
      );
    }
  }, [success]);

  useEffect(() => {
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
      if (emptyCheck(page) || emptyCheck(totalPages)) return [];
      const makeSpan = (index, text) => (
        <span
          key={index}
          onClick={handleNextPage(index)}
          className={page === index ? 'current' : ''}
        >
          {text}
        </span>
      );

      // 페이지네이션 그룹들 ==> 페이지네이션 그룹 ==> 버튼들

      // 하나의 페이지네이션 그룹에 몇개의 버튼이 만들지 결정하는 변수
      const PAGINATION_NUMBER_COUNT = 5;
      // 현재 보고있는 페이지의 그룹이 어딘지 계산
      const currentPageGroup = Math.ceil(page / PAGINATION_NUMBER_COUNT);
      // PAGENATION_NUMBER_COUNT개씩 몇개의 그룹이 만들어지는지 계산
      const lastPageGroup = Math.ceil(totalPages / PAGINATION_NUMBER_COUNT);

      // 현재 그룹에서 번호가 몇번 부터 시작하는지 계산
      const start = (currentPageGroup - 1) * PAGINATION_NUMBER_COUNT + 1;
      // 다음 그룹의 시작번호가 몇번 부터인지 계산
      const nextPage = currentPageGroup * PAGINATION_NUMBER_COUNT + 1;
      // 이전 그룹의 마지막번호가 몇번 부터인지 계산
      const prevPage = (currentPageGroup - 1) * PAGINATION_NUMBER_COUNT;

      // 현재 페이지네이션그룹에 몇개의 버튼을 그릴지 계산
      const length =
        currentPageGroup === lastPageGroup
          ? totalPages + 1 - start
          : PAGINATION_NUMBER_COUNT;

      const pagiNationButtons = Array.from({ length }).map((_, i) => {
        const index = (currentPageGroup - 1) * PAGINATION_NUMBER_COUNT + 1 + i;
        return makeSpan(index, index);
      });

      // 현재 페이지네이션그룹이 첫번째가 아니면 이전 페이지네이션그룹 버튼 생성
      if (currentPageGroup !== 1) {
        pagiNationButtons.unshift(makeSpan(prevPage, 'prev'));
      }

      // 현재 페이지네이션그룹이 마지막그룹이 아니면 다음 페이지네이션그룹 버튼 생성
      if (currentPageGroup !== lastPageGroup) {
        pagiNationButtons.push(makeSpan(nextPage, 'next'));
      }
      return pagiNationButtons;
    },
    [handleNextPage]
  );

  const pagiNations = emptyCheck(results)
    ? Array.from({ length: 5 }, (_, idx) => (
        <span key={idx} className="skeleton-number" />
      ))
    : makePagination(page, totalPages);

  const cards = emptyCheck(results)
    ? Array.from({ length: 10 }, (v, idx) => <Card key={idx} {...v} />)
    : results.map(card => <Card {...card} key={card.id} />);

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <CardsBox cards={cards} loading={loading} />
      <Pagination>{pagiNations}</Pagination>
    </>
  );
};

export default NoticeBoardContainer;
