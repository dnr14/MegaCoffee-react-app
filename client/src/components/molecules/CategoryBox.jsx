import React from 'react';
import { Link, useRouteMatch, Route } from 'react-router-dom';
import styled from 'styled-components';
import CategoryImg from '../atoms/CategoryImg';
import CategorySpan from '../atoms/CategorySpan';

const CategoryBox = ({ container, containerIdx }) => {
  const match = useRouteMatch();
  return (
    <Row>
      <Col>
        {container.map((category, categoryIdx) => {
          if (Object.entries(category).length === 0)
            return <StyledDiv key={categoryIdx} />;

          return (
            <Link
              key={category.id}
              to={`${match.url}/${containerIdx}${categoryIdx}`}
            >
              <StyledDiv>
                <ImgBox>
                  <CategoryImg src={category.thumbnail} alt="thumbnail" />
                </ImgBox>
                <Title>
                  <CategorySpan ice={category.temperature === 'ice'}>
                    {String(category.temperature).toUpperCase()}
                  </CategorySpan>
                  {category.title}
                </Title>
              </StyledDiv>
            </Link>
          );
        })}
      </Col>
      <Route
        path={`${match.url}/:id`}
        render={({ match }) => {
          return (
            <>
              {container.map(
                (category, categoryIdx) =>
                  `${containerIdx}${categoryIdx}` === match.params.id && (
                    <Info key={category.id}>
                      <div>
                        <CategoryImg src={category.thumbnail} alt="thumbnail" />
                      </div>
                      <div>
                        <div>
                          <CategorySpan ice={category.temperature === 'ice'}>
                            {String(category.temperature).toUpperCase()}
                          </CategorySpan>
                          {category.title}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: category.body }}
                        />
                      </div>
                    </Info>
                  )
              )}
            </>
          );
        }}
      />
    </Row>
  );
};

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
  border-bottom: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
  justify-content: center;
  padding: 1rem 0;
  & > div {
    position: relative;
    width: 400px;
    height: 400px;
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  p {
    font-size: 0.7rem;
    line-height: 1.5;
  }

  ${({ theme, last }) =>
    last &&
    css`
      border-top: 1px solid ${theme.color.magacoffeColor1};
    `}
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Col = styled.div`
  display: flex;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 198.8px;
  height: 200px;
  border-right: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
  border-bottom: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
`;

const ImgBox = styled.div`
  width: 150px;
  padding-top: 150px;
  position: relative;
`;

export default CategoryBox;
