import Cards from '@/components/molecules/Cards';
import withLoading from '@/hoc/withLoading';
import { getAccessToken } from '@/utils/localstorege';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardsBox = ({ cards }) => {
  const createButton = !!getAccessToken() && (
    <div>
      <Link to="/noticeBoard/insert">
        <span>건의 하기</span>
      </Link>
    </div>
  );

  return (
    <CardsBoxContainer>
      <div>
        <h2>건의 게시판</h2>
        {createButton}
      </div>
      <Cards>{cards}</Cards>
    </CardsBoxContainer>
  );
};

const CardsBoxContainer = styled.div`
  min-height: 700px;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    align-items: center;

    h2 {
      font-size: 1.2rem;
      margin: 10px;
    }

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
  }
`;

export default withLoading(CardsBox);
