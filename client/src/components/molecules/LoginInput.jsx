import FormInput from '@/components/atoms/FormInput';
import { memo } from 'react';
import styled from 'styled-components';

const LoginInput = ({ ...rest }) => {
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
  &::placeholder {
    font-size: 0.7rem;
    letter-spacing: 0;
  }
`;

export default memo(LoginInput);
