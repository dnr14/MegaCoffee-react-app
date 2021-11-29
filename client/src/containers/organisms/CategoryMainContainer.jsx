import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { menuSelect } from '@/api/admin';
import CategoryBox from '@/components/molecules/CategoryBox';
import Alert from '@/components/atoms/Alert';

const CategoryMainContainer = () => {
  const [categorys, setCategory] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { results } = categorys;
  const param = useParams();
  // coffee , ade , beverage ...
  const { id } = param;

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          // 하나의 로우에 담길 열의 개수
          const COL_NUM = 5;

          const page = 1;
          // 다 가져오는거 개발
          const limit = 50;
          const categorys = id;
          const { data } = await menuSelect(page, limit, categorys);
          // results안에는 9개의 객체가 담겨있는 배열입니다.
          const { results, totalResults } = data;
          // 15 - 14 = 빈객체
          const rowCount = Math.ceil(totalResults / COL_NUM);

          // 4개 씩 나누면 [[1],[2],[3]] 3개의 배열이 들어있는 2차원 배열로 만들어줍니다.
          const makeArray = Array.from({ length: rowCount }, () => []);
          const fullArrayLength = rowCount * COL_NUM;
          Array.from({ length: fullArrayLength }).map((_, i) => {
            const index = Math.floor(i / COL_NUM);
            const result = results[i] ? results[i] : {};
            return makeArray[index].push(result);
          });

          setCategory({
            ...data,
            results: makeArray,
          });
        }
      } catch (error) {
        setAlertOpen(true);
        setAlertMessage(
          <div className="red">
            <span>서버에서 에러가 발생했습니다.</span>
          </div>
        );
      }
    })();
  }, [id]);

  const categoryEls = results?.map((container, containerIdx) => {
    return (
      <CategoryBox
        container={container}
        containerIdx={containerIdx}
        key={containerIdx}
      />
    );
  });

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <div
        style={{
          marginTop: '100px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          color: 'red',
          fontWeight: 'bold',
          fontSize: '0.7rem',
        }}
      >
        <strong>※ 본 이미지는 연출컷입니다.</strong>
      </div>
      <Continer>{categoryEls}</Continer>
    </>
  );
};

const Continer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-left: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
  border-top: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
`;

export default CategoryMainContainer;
