import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import withLoading from '@/hoc/withLoading';
import { isEmptyObject } from '@/utils/validations';

const Notice = ({ post, userInfo, noticeDelete }) => {
  const { url } = useRouteMatch();
  const { id, body, category, categoryThumbnail, writer, createAt, updateAt } =
    post;

  if (isEmptyObject(post)) {
    return (
      <Container>
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-date" />
        <div className="skeleton skeleton-img" />
        <div className="skeleton skeleton-category" />
        <div className="skeleton skeleton-editor" />
      </Container>
    );
  }

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
          <span onClick={noticeDelete(id)}>삭제하기</span>
        </ModifyBox>
      )}

      <TitleBox>
        <h6>{post.title}</h6>
      </TitleBox>
      <DateBox>
        {updateAt === '' ? (
          <span>{createAt}</span>
        ) : (
          <>
            <span> {updateAt}</span>
            <UnderBar>업데이트됨</UnderBar>
          </>
        )}
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
  margin-top: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  border: 1px solid ${({ theme }) => theme.color.magacoffeColor1};
  padding: 1rem;
  line-height: 1.5;
  min-height: 300px;
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

  .skeleton {
    border-radius: 5px;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.color.skeletonColor};
    ${({ theme }) => theme.skeletonAnimation}
  }

  .skeleton-title {
    height: 2.5rem;
  }
  .skeleton-date {
    height: 1rem;
  }
  .skeleton-category {
    height: 1.5rem;
  }
  .skeleton-img {
    height: 400px;
  }
  .skeleton-editor {
    margin-bottom: 0;
    padding: 1rem;
    margin-top: 1rem;
    min-height: 300px;
    border-radius: 20px;
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
  display: flex;
  gap: 10px;
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

const UnderBar = styled.span`
  position: relative;
  color: rgba(149, 165, 166, 0.4);
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid rgba(149, 165, 166, 0.4);
    bottom: -20%;
  }
`;

export default withLoading(Notice);
