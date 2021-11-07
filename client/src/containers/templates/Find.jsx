import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
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
        <FindContainer />
      </FlexBox>
    </Layout>
  );
};

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
