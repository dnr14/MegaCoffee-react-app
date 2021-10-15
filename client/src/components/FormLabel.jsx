import React from 'react';
import styled from 'styled-components';

const FormLabel = ({ children, ...rest }) => {
  return <Label {...rest}>{children}</Label>;
};

const Label = styled.label``;

export default FormLabel;
