import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.media.tab} {
    font-size: 0.7rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.6rem;
    flex-direction: column;
    gap: 0.3rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 0.5rem;
  }
`;

export default FlexBox;
