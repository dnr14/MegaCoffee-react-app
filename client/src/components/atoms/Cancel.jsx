import React, { memo } from 'react';
import styled from 'styled-components';
import cancelImg from '@/assets/images/cancel.svg';

const Cancel = ({ ...rest }) => {
  return <Span {...rest} />;
};

const Span = styled.span`
  position: absolute;
  display: inline-block;
  top: 0;
  right: 2%;
  bottom: 0;
  margin: auto;
  padding: 0.2rem;
  height: 1rem;
  width: 1rem;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  background-image: url(${cancelImg});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  transition: background-color 0.35s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.color.red1};
    opacity: 0.5;
    box-shadow: 2px 2px 0px ${({ theme }) => theme.color.shadowColor};
  }
`;

export default memo(Cancel);
