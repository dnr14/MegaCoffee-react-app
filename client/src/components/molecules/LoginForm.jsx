import React from 'react';
import styled from 'styled-components';
import Form from '../atoms/Form';

const LoginForm = ({ children, ...rest }) => (
  <ExtentionForm {...rest}>{children}</ExtentionForm>
);

const ExtentionForm = styled(Form)`
  margin: 0;
  gap: 0;
  & > div {
    margin-top: 1rem;

    & > span {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.7rem;
    }
  }
`;

export default LoginForm;
