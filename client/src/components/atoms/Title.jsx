import { memo } from 'react';
import styled from 'styled-components';

const Title = ({ children }) => <TitleWrapper>{children}</TitleWrapper>;
const TitleWrapper = styled.h2`
  line-height: 2.5rem;
  font-size: 1.75rem;
  letter-spacing: 0.2rem;
  text-align: center;
  word-break: keep-all;
`;

export default memo(Title);
