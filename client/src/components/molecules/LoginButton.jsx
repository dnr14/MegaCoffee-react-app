import React, { memo } from 'react';
import styled from 'styled-components';
import Button from '@/components/atoms/Button';

const LoginButton = ({ children, ...rest }) => {
  return <ExtensionButton {...rest}>{children}</ExtensionButton>;
};

const ExtensionButton = styled(Button)`
  letter-spacing: 0;
  border-radius: ${({ theme }) => theme.borderRadius1};
  background-color: ${({ theme }) => theme.color.coffee1};
`;

export default memo(LoginButton);
