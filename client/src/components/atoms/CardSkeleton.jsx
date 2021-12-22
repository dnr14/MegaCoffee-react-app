import styled, { css } from 'styled-components';

const CardSkeleton = () => {
  return (
    <StyledDiv>
      <CardImg />
      <CardBodyLayout>
        <p />
        <p />
        <p />
        <p />
        <p />
      </CardBodyLayout>
    </StyledDiv>
  );
};

const ani = css`
  position: relative;
  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 1s infinite linear;
  }

  @keyframes loading {
    0% {
      transform: translateX(-10%);
    }
    50%,
    100% {
      transform: translateX(100%);
    }
  }
`;

const CardBodyLayout = styled.div`
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(149, 165, 166, 0.2);
  border-top: 0;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  gap: 5px;
`;

const CardImg = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 150px;
  background-color: rgba(149, 165, 166, 0.2);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  ${({ theme }) => theme.media.tab} {
    padding-top: 250px;
  }
`;

const StyledDiv = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.25s ease-in;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  margin-bottom: 0.5rem;

  strong {
    font-weight: bold;
  }

  &:hover {
    transform: translateY(-8px);
  }

  div:first-child {
    ${ani}
  }

  p {
    &:first-child {
      height: 50px;
    }
    &:nth-child(2) {
      height: 40px;
    }
    &:nth-child(3) {
      height: 30px;
    }
    &:nth-child(4) {
      height: 30px;
    }

    overflow: hidden;
    position: relative;
    background-color: rgba(149, 165, 166, 0.2);
    min-height: 20px;
    ${ani}
  }
`;

export default CardSkeleton;
