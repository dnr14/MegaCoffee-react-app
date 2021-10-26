import React from 'react';
import styled from 'styled-components';

import Strong from '../atoms/Strong';

const WarningBox = ({ children }) => {
  return (
    <>
      <StyledDiv>
        {children}
        <div>
          <span>
            (<Strong>*</Strong>) 항목은 필수 입력값입니다.
          </span>
        </div>
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  & > div {
    display: flex;
    gap: 0.3rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;

    & > span {
      font-size: 0.8rem;
      ${({ theme }) => theme.media.mobile} {
        font-size: 0.6rem;
      }
    }
  }
`;

export default WarningBox;
