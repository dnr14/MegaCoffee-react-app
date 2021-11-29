import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import noThumbnail from '@/assets/images/noThumbnail.png';
import { toStringByFormatting } from '@/utils/formatUtil';
import { emptyCheck } from '@/utils/validations';

const Card = props => {
  const { title, body, thumbnail, createAt, updateAt, writer, id, comments } =
    props;

  const date = emptyCheck(updateAt) ? updateAt : createAt;

  const categoryThumbnail = emptyCheck(thumbnail) ? (
    <img src={noThumbnail} alt="thumbnail" />
  ) : (
    <img src={thumbnail} alt="thumbnail" />
  );

  const card = emptyCheck(props) ? (
    <>
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <p className="skeleton skeleton-text" />
        <p className="skeleton skeleton-text" />
        <p className="skeleton skeleton-text" />
        <p className="skeleton skeleton-text" />
        <p className="skeleton skeleton-text" />
      </div>
    </>
  ) : (
    <Link to={`/noticeBoard/${id}`}>
      <CardImg>{categoryThumbnail}</CardImg>
      <CardBodyLayout>
        <CardTitle>{title}</CardTitle>
        <CardBody dangerouslySetInnerHTML={{ __html: body }} />
        <p>
          <strong>Writer</strong> : {writer}
        </p>
        <p>{toStringByFormatting(date)}</p>
        <p>댓글 수 {comments.length}개</p>
      </CardBodyLayout>
    </Link>
  );

  return <StyledDiv>{card}</StyledDiv>;
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.25s ease-in;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  margin-bottom: 0.5rem;

  strong {
    font-weight: bold;
  }

  &:hover {
    transform: translateY(-8px);
  }
  .skeleton {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.skeletonColor};
    ${({ theme }) => theme.skeletonAnimation}
  }

  .skeleton-img {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;

    padding-top: 150px;
  }

  .skeleton-body {
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(149, 165, 166, 0.2);
    border-top: 0;
    padding: 0.5rem;
    padding-bottom: 1rem;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    gap: 5px;
  }

  .skeleton-text {
    height: 1rem;
  }
`;

const CardBodyLayout = styled.div`
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(149, 165, 166, 0.2);
  border-top: 0;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  gap: 5px;
`;

const CardImg = styled.div`
  position: relative;
  padding-top: 150px;

  ${({ theme }) => theme.media.tab} {
    padding-top: 250px;
  }

  img {
    top: 0;
    position: absolute;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    width: 100%;
    height: 100%;
  }
`;

const CardTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.5rem;
  padding: 0.5rem 0;
`;

const CardBody = styled.div`
  height: 50px;
  ${({ theme }) => theme.media.tab} {
    height: 70px;
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default memo(Card);
