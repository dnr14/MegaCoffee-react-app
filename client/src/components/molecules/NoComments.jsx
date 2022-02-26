import noComments from '@/assets/images/noComments.png';
import styled from 'styled-components';

const NoComments = () => {
  return (
    <Layout>
      <img src={noComments} alt="noComments" />
      <div>댓글이 없습니다.</div>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  gap: 10px;

  img {
    width: 200px;
  }
`;

export default NoComments;
