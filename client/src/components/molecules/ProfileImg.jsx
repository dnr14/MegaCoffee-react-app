import React from 'react';
import styled from 'styled-components';

const ProfileImg = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  & > label {
    width: 200px;
    height: 200px;
    cursor: pointer;
    position: relative;
  }

  & > label > input {
    display: none;
  }

  & > label > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(130deg, #74b9ff, #e66767);
    box-sizing: border-box;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    overflow: hidden;
    background-size: 200% 200%;
    animation: move 2s linear infinite;
    & > img {
      width: 100%;
      height: 100%;
      display: inline-block;
      border-radius: 50%;
    }
  }

  @keyframes move {
    25% {
      background-position: left bottom;
    }
    50% {
      background-position: right bottom;
    }
    75% {
      background-position: right top;
    }
    100% {
      background-position: left top;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 0.5rem;
    & > p {
      font-size: 0.7rem;
      line-height: 1.1rem;
    }
  }
`;

export default ProfileImg;
