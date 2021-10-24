import React, { memo } from 'react';
import styled from 'styled-components';

const FormLabel = ({ children, ...rest }) => {
  return <Label {...rest}>{children}</Label>;
};

const Label = styled.label`
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
`;

export default memo(FormLabel);
