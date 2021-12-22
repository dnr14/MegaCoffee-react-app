import { useLayoutEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Layout from '@/components/atoms/Layout';
import Title from '@/components/atoms/Title';

const Welcome = () => {
  const location = useLocation();
  const history = useHistory();
  const { state } = location;

  useLayoutEffect(() => {
    if (!state) {
      history.push('/membership');
    }
  }, [state, history]);

  return (
    <Layout>
      <StyledDiv>
        <Title>🎉 환영 합니다.</Title>
        <div>
          <strong>{state.props.id}</strong> 님 가입을 축하드립니다.
        </div>
        <Link
          to={{
            pathname: '/login',
            props: {
              id: state.props.id,
            },
          }}
        >
          <Button>sign in</Button>
        </Link>
      </StyledDiv>
    </Layout>
  );
};

const StyledDiv = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  & > div {
    padding: 2rem 0;
    text-align: center;
    word-break: keep-all;
    line-height: 1.5rem;
  }

  strong {
    font-weight: bold;
  }
`;

export default Welcome;
