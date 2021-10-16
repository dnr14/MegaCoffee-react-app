import React, { memo } from 'react';
import styled, { css } from 'styled-components';

const FormInput = ({ ...rest }) => {
  return <StyledInput {...rest} />;
};

const StyledInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-top: 0.7rem;
  line-height: 1.875rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.1rem;
  letter-spacing: 0.123rem;
  border: 1px solid rgba(45, 52, 54, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border 0.35s ease-in;
  ${({ error, theme, value }) => {
    if (value === '' && error === null) {
      return css`
        border: 1px solid black;
      `;
    }
    if (error) {
      return css`
        border: 1px solid ${theme.color.red1};
      `;
    }
    if (!error) {
      return css`
        border: 1px solid ${theme.color.green1};
      `;
    }
  }};

  &::placeholder {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.shadowColor};
  }
`;

// return true 재랜더링 x
// input에 들오어는 value가 같다면 재랜더링 x
export default memo(FormInput, (prev, next) => {
  return prev.value === next.value && prev.error === next.error;
});
