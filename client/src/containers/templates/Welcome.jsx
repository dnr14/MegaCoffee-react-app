import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/atoms/Button';
import Title from '@/components/atoms/Title';
import Layout from '@/components/atoms/Layout';

const Welcome = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const { state } = location;
    if (!state) {
      history.push('/membership');
    }
  }, [location, history]);

  return (
    <Layout>
      <Title>🎉 환영 합니다.</Title>
      <StyledDid>
        <div>{location.state.props.id}님 가입을 축하드립니다.</div>
        <Link
          to={{
            pathname: '/login',
            props: {
              id: location.state.props.id,
            },
          }}
        >
          <Button>sign in</Button>
        </Link>
      </StyledDid>
    </Layout>
  );
};

const StyledDid = styled.div`
  margin-bottom: 2rem;

  & > div {
    padding: 2rem 0;
    text-align: center;
    word-break: keep-all;
    line-height: 1.5rem;
  }
`;

export default Welcome;
