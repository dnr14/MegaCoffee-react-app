import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../atoms/Title';
import TopLogo from '@/assets/images/topLogo.png';

const HeaderTitle = () => {
  return (
    <StyledDiv>
      <Title>
        <Link to="/">
          <img src={TopLogo} alt="logo" />
        </Link>
      </Title>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  & > h2 {
    padding: 0.5rem 1rem 0.5rem 1rem;
    ${({ theme }) => theme.media.mobile} {
      padding: 1.5rem 0.5rem;
      text-align: end;
    }
  }
  img {
    display: inline-block;
    width: 80%;
  }
`;

export default memo(HeaderTitle);
