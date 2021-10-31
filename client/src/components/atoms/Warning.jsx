import React from 'react';
import styled from 'styled-components';
import warningImg from '@/assets/images/warning.svg';

const Warning = ({ children }) => {
  return (
    <div>
      <img src={warningImg} alt="warning" />
      <Span>{children}</Span>
    </div>
  );
};

const Span = styled.span`
  line-height: 1.3rem;
`;

export default Warning;
