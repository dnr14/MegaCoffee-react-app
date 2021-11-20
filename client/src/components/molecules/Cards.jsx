import React from 'react';
import styled from 'styled-components';

const Cards = ({ children }) => {
  return <FlexBox>{children}</FlexBox>;
};

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 20%;
    ${({ theme }) => theme.media.tab} {
      width: 50%;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 100%;
    }
  }
`;

export default Cards;
