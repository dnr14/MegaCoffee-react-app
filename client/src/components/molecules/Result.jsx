import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginButton from './LoginButton';

const Result = ({ children }) => {
  return (
    <div>
      <H2>고객님이 찾으신 입니다.</H2>
      <FlexBox>{children}</FlexBox>
      <div>
        <Link to="/login">
          <LoginButton type="button">로그인</LoginButton>
        </Link>
      </div>
    </div>
  );
};

const H2 = styled.h2`
  padding: 1rem;
  text-align: center;
  border-radius: 5px;
  background-color: #572526;
  color: #fff;
`;

const FlexBox = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

export default Result;
