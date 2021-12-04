import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfoLable from '../atoms/InfoLable';
import NoProfile from '../atoms/noProfile';
import { emptyCheck } from '@/utils/validations';

const Profile = ({ id, name, thumbnail }) => {
  return (
    <FlexBox>
      <Inner>
        <div>
          {emptyCheck(thumbnail) ? (
            <NoProfile />
          ) : (
            <img src={thumbnail} alt="profile" />
          )}

          <InfoLable>{id}</InfoLable>
          <InfoLable>{name}</InfoLable>
        </div>
        <div>
          <InfoLable>
            <Link to="/info">정보수정</Link>
          </InfoLable>
          <InfoLable>
            <Link to="/logout">로그아웃</Link>
          </InfoLable>
        </div>
      </Inner>
    </FlexBox>
  );
};

const FlexBox = styled.div`
  position: absolute;
  right: 2%;
  top: 0;
  bottom: 0;
  margin-right: 1rem;
  padding: 0.4rem;
  margin: 0.3rem 0;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius2};
  width: 250px;

  background-color: ${({ theme }) => theme.color.coffee1};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.shadowColor};

  ${({ theme }) => theme.media.tab} {
    display: none;
  }

  a {
    padding: 0.5rem 0;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.color.coffee2};
  gap: 10px;

  & > div {
    display: flex;
  }

  & > div:first-child {
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;

    & > img {
      background-size: cover;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      padding: 0.2rem;
      background-color: ${({ theme }) => theme.color.coffee1};
    }
  }

  & > div:last-child {
    justify-content: flex-start;
    gap: 0.5rem;
    font-size: 0.6rem;
  }
`;

export default memo(Profile);
