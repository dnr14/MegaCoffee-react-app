import React, { memo } from 'react';
import styled from 'styled-components';
import FormInput from '../atoms/FormInput';

const UserInfoInput = ({ ...rest }) => {
  return <ExtensionInput {...rest} />;
};

const ExtensionInput = styled(FormInput)`
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-radius: 0;
  padding-left: 0;
  padding-right: 2rem;
  margin-top: 0.3rem;
  border-bottom: 1px solid black;
`;

export default memo(UserInfoInput);
