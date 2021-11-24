import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';

const Notice = ({ post, userInfo, boardDelete }) => {
  const { url } = useRouteMatch();
  const { id, body, category, categoryThumbnail, timeStemp, writer } = post;
  return (
    <Container>
      {writer === userInfo.id && (
        <ModifyBox>
          <span>
            <Link
              to={{
                pathname: `/${url.split('/')[1]}/modify`,
                state: {
                  id,
                  writer,
                },
              }}
            >
              수정하기
            </Link>
          </span>
          <span onClick={boardDelete(id)}>삭제하기</span>
        </ModifyBox>
      )}

      <TitleBox>
        <h6>{post.title}</h6>
      </TitleBox>
      <DateBox>
        <span>등록일 {moment(Number(timeStemp)).format('YYYY-MM-DD')}</span>
      </DateBox>
      <ImgBox>
        <img src={categoryThumbnail} alt="thumbnail" />
      </ImgBox>
      <div>
        <span>문의한 음료 : {category}</span>
      </div>
      <CKContent
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </Container>
  );
};

const CKContent = styled.div`
  word-break: 'break-all';
  min-height: 300px;
  margin-top: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  border: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
  padding: 1rem;
  line-height: 1.5;
  border-radius: 20px;

  ${({ theme }) => theme.media.tab} {
    font-size: 1rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 0.5rem;
  }

  &::after {
    content: '';
    clear: both;
    display: block;
  }
`;

const Container = styled.div`
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow1};

  ${({ theme }) => theme.media.tab} {
    font-size: 1rem;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;

const ModifyBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  span {
    display: inline-block;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 5px;
    color: ${({ theme }) => theme.color.white1};
    background-color: ${({ theme }) => theme.color.magacoffeColor1};
    box-shadow: ${({ theme }) => theme.boxShadow1};
    font-weight: bold;

    &:hover {
      border: 1px solid ${({ theme }) => theme.color.shadowColor};
    }

    ${({ theme }) => theme.media.tab} {
      font-size: 1rem;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.7rem;
    }
    ${({ theme }) => theme.media.mobileS} {
      font-size: 0.5rem;
    }
  }

  span + span {
    margin-left: 1rem;
  }
`;

const TitleBox = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.1;
  ${({ theme }) => theme.media.tab} {
    font-size: 2.5rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 1.5rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 1.2rem;
  }
`;

const ImgBox = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
  }
`;

const DateBox = styled.div`
  margin-bottom: 1rem;
  ${({ theme }) => theme.media.tab} {
    font-size: 1rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 0.5rem;
  }
`;

export default Notice;
