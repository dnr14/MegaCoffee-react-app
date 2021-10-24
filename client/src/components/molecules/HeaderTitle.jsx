import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../atoms/Title';

const HeaderTitle = () => {
  return (
    <StyledDiv>
      <Title>
        <Link to="/">MEGA COFFEE</Link>
      </Title>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  & > h2 {
    padding: 1rem;
    ${({ theme }) => theme.media.mobile} {
      padding: 1.5rem;
      text-align: end;
    }
  }
`;

export default memo(HeaderTitle);
