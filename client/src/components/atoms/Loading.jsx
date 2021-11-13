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
          <img src={loding} alt="loading" />
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
  z-index: 10;

  img {
    width: 20%;
    -webkit-user-drag: none;
  }

  ${({ theme }) => theme.media.mobile} {
    img {
      width: 50%;
    }
  }
`;

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default memo(Loading);
