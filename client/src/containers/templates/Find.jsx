import React from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FindContainer from '@/containers/organisms/FindContainer';
import Layout from '@/components/atoms/Layout';
import WarningBox from '@/components/molecules/WarningBox';
import Warning from '@/components/atoms/Warning';

const Find = () => {
  const match = useRouteMatch();

  return (
    <Layout>
      <FlexBox>
        <Switch>
          <Route path={`${match.path}/id`}>
            <WarningBox>
              <Warning>
                이메일, 생년월일을 입력하신 후 통해 아이디 찾기가 가능합니다.
              </Warning>
              <Warning>
                이메일, 생년월일을 입력하신 후 버튼을 클릭해 주세요.
              </Warning>
            </WarningBox>
          </Route>
          <Route path={`${match.path}/pwd`}>
            <WarningBox>
              <Warning>
                아이디, 이메일, 생년월일을 입력하신 후 통해 비밀번호 찾기가
                가능합니다.
              </Warning>
              <Warning>
                아이디, 이메일, 생년월일을 입력하신 후 버튼을 클릭해 주세요.
              </Warning>
            </WarningBox>
          </Route>
        </Switch>
        <LinkBox>
          <NavLink to={`${match.path}/id`} activeClassName="active">
            아이디찾기
          </NavLink>
          <NavLink to={`${match.path}/pwd`} activeClassName="active">
            비밀번호찾기
          </NavLink>
        </LinkBox>
        <FindContainer />
      </FlexBox>
    </Layout>
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

const FlexBox = styled.div`
  padding: 1rem;
  width: 60%;
  margin: auto;
  box-shadow: 2px 2px 10px ${({ theme }) => theme.color.shadowColor};
  ${({ theme }) => theme.media.pc} {
    width: auto;
  }
  & > form {
    padding: 0 1.5rem;
  }
`;

export default Find;
