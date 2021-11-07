import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Strong from '@/components/atoms/Strong';

const WarningBox = ({ children }) => {
  const match = useRouteMatch();
  const path = match.path.match(/^\/.*\//gi)[0];
  return (
    <>
      <StyledDiv>
        {children}
        <div>
          <span>
            (<Strong>*</Strong>) 항목은 필수 입력값입니다.
          </span>
        </div>
      </StyledDiv>
      <LinkBox>
        <NavLink to={`${path}id`} activeClassName="active">
          아이디찾기
        </NavLink>
        <NavLink to={`${path}pwd`} activeClassName="active">
          비밀번호찾기
        </NavLink>
      </LinkBox>
    </>
  );
};

const LinkBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 0 1rem;
  & > a {
    flex: 1;
    line-height: 2rem;
    text-align: center;
    word-break: keep-all;
    padding: 0 0.5rem;
    font-size: 0.8rem;
    border: 1px solid transparent;
    transition: border 0.35s ease-in;
    border-top-right-radius: ${({ theme }) => theme.borderRadius1};
    border-top-left-radius: ${({ theme }) => theme.borderRadius1};

    &:hover {
      border-top: 1px solid black;
      border-right: 1px solid black;
      border-left: 1px solid black;
    }
  }

  .active {
    border-top-right-radius: ${({ theme }) => theme.borderRadius1};
    border-top-left-radius: ${({ theme }) => theme.borderRadius1};
    box-shadow: 2px 2px 10px ${({ theme }) => theme.color.shadowColor};
    background-color: ${({ theme }) => theme.color.coffee1};
    color: ${({ theme }) => theme.color.white1};
    font-weight: bold;
    &:hover {
      border-top-right-radius: ${({ theme }) => theme.borderRadius1};
      border-top-left-radius: ${({ theme }) => theme.borderRadius1};
      border: 1px solid transparent;
    }
  }
`;
const StyledDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  & > div {
    display: flex;
    gap: 0.3rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;

    & > span {
      font-size: 0.8rem;
      ${({ theme }) => theme.media.mobile} {
        font-size: 0.6rem;
      }
    }
  }
`;

export default WarningBox;
