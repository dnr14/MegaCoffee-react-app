import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { menuSelect } from '@/api/admin';
import CategoryBox from '@/components/molecules/CategoryBox';

const CategoryMainContainer = () => {
  const [categorys, setCategory] = useState({});
  const { results } = categorys;
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      const page = 1;
      // 다 가져오는거 개발
      const limit = 50;
      const categorys = param.id;
      menuSelect(page, limit, categorys).then(response => {
        // results안에는 9개의 객체가 담겨있는 배열입니다.
        const { results, totalResults } = response.data;
        const NANUM = 5;
        // 15 - 14 = 빈객체
        const rowCount = Math.ceil(totalResults / NANUM);
        const fullArrayLength = rowCount * NANUM;

        const newResultsArray = [];
        for (let i = 0; i < fullArrayLength; i += 1) {
          if (results[i]) newResultsArray.push(results[i]);
          if (!results[i]) newResultsArray.push({});
        }
        // 4개 씩 나누면 [[1],[2],[3]] 3개의 배열이 들어있는 2차원 배열로 만들어줍니다.
        // const newArray = [[], [], []];
        const makeRowArray = Array.from({ length: rowCount }).map(() => []);
        // 배열안에 2차원 배열에 4개씩 나눠 담을려고 합니다.
        // forEach를 돌려서 4,4,1로 담아 줄려고합니다.
        newResultsArray.forEach((result, idx) => {
          const index = Math.floor(idx / NANUM);
          makeRowArray[index].push(result);
        });

        setCategory({
          ...response.data,
          results: makeRowArray,
        });
      });
    }
  }, [param.id]);

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
