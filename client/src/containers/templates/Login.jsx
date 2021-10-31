import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '@/components/atoms/Layout';
import coffee from '@/assets/images/coffee.png';
import LoginContainer from '@/containers/organisms/LoginContainer';

const Login = () => {
  return (
    <Layout>
      <FlexBox>
        <div />
        <div>
          <h2>LOGIN</h2>
          <NewMember>
            <span>아직 계정이 없으신가요?</span>
            <span>
              <Link to="/membership">계정만들기</Link>
            </span>
          </NewMember>
          <LoginContainer />
          <SearchMamber>
            <span>
              <Link to="/find/id">아이디 찾기</Link>
            </span>
            <span>
              <Link to="/find/pwd">비밀번호 찾기</Link>
            </span>
          </SearchMamber>
        </div>
      </FlexBox>
    </Layout>
  );
};

const FlexBox = styled.div`
  display: flex;
  position: relative;
  padding: 2rem;
  margin: 1rem 0;
  color: ${({ theme }) => theme.color.coffee1};
  background: ${({ theme }) => theme.color.red2};
  border-radius: ${({ theme }) => theme.borderRadius2};

  & > div {
    &:first-child {
      flex: 6;
      background-image: url(${coffee});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #d1a766;
      border-radius: ${({ theme }) => theme.borderRadius2};
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      padding: 1rem;
    }
    &:last-child {
      flex: 4;
      padding: 1rem;
      background-color: #fff;
      border-radius: ${({ theme }) => theme.borderRadius2};
      box-shadow: -2px 0 0.4rem ${({ theme }) => theme.color.shadowColor};
      margin-left: -1.5rem;

      & > h2 {
        font-weight: 900;
        letter-spacing: 0.1rem;
        font-size: 1.5rem;
        padding-top: 1rem;
        text-align: center;
      }
    }
  }

  ${({ theme }) => theme.media.tab} {
    flex-direction: column;
    & > div {
      &:first-child {
        border-radius: ${({ theme }) => theme.borderRadius2};
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        padding: 1.5rem;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin: 0;
      }
    }
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
  }
`;

const NewMember = styled.div`
  margin-top: 1rem;

  & > span {
    word-break: keep-all;
    font-size: 0.6rem;
    line-height: 1.2rem;
    &:first-child {
      font-weight: 600;
      color: ${({ theme }) => theme.color.shadowColor};
      margin-right: 0.5rem;
    }
    &:last-child {
      color: ${({ theme }) => theme.color.magacoffeColor};
      font-weight: 700;
    }
    & > a {
      padding: 0.5rem 0;
    }
  }
`;

const SearchMamber = styled.div`
  margin-top: 0.5rem;
  & > span {
    word-break: keep-all;
    font-size: 0.6rem;
    line-height: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.shadowColor};
    color: ${({ theme }) => theme.color.magacoffeColor};
    margin-right: 0.5rem;
    display: inline-block;
    & > a {
      padding: 0.5rem 0;
    }
  }
`;

export default Login;
