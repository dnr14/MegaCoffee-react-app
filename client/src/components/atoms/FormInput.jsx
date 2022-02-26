import { memo } from 'react';
import styled, { css } from 'styled-components';

const FormInput = ({ ...rest }) => {
  return <StyledInput {...rest} />;
};

const StyledInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-top: 0.7rem;
  font-size: 0.7rem;
  padding: 0.7rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ error, theme, value, isSignup }) => {
    if (value === '' && error === null) {
      if (isSignup) {
        return css`
          ${({ theme }) => theme.boxShadow3};
          border: 2px solid transparent;
        `;
      }

      return css`
        border: 2px solid;
      `;
    }
    if (error) {
      return css`
        border: 2px solid ${theme.color.red1};
      `;
    }
    return css`
      border: 2px solid ${theme.color.green1};
    `;
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
