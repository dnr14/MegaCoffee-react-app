import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import loding from '@/assets/images/loading.gif';

const Loading = ({ loading }) => {
  return createPortal(
    <>
      {loading && (
        <StyledDiv>
          <img src={loding} alt="loading-bar" />
        </StyledDiv>
      )}
    </>,
    document.querySelector('#modal')
  );
};

const StyledDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  & > img {
    width: 30%;
    -webkit-user-drag: none;
    ${({ theme }) => theme.media.mobile} {
      width: 70%;
    }
  }
`;

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default memo(Loading);
