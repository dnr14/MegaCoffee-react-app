import React, { memo } from 'react';
import styled from 'styled-components';
import FormLabel from '@/components/atoms/FormLabel';

const LoginLabel = ({ children }) => {
  return <ExtensionLabel>{children}</ExtensionLabel>;
};

const ExtensionLabel = styled(FormLabel)`
  letter-spacing: 0;
`;

export default memo(LoginLabel);
