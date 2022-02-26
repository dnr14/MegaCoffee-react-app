import loadingImg from '@/assets/images/loading.gif';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Loading = ({ loading }) => {
  return createPortal(
    <>
      {loading && (
        <StyledDiv>
          <img src={loadingImg} alt="loading" />
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
    width: 200px;
    -webkit-user-drag: none;
  }

  ${({ theme }) => theme.media.mobile} {
    img {
      width: 100px;
    }
  }
`;

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default memo(Loading);
