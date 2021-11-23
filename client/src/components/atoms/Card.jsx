import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import noThumbnail from '@/assets/images/noThumbnail.png';
import { toStringByFormatting } from '@/utils/formatUtil';

const Card = props => {
  const { title, body, thumbnail, createAt, updateAt, writer, id } = props;

  return (
    <StyledDiv>
      <Link to={`/noticeBoard/${id}`}>
        <CardImg>
          {thumbnail !== '' ? (
            <img src={thumbnail && noThumbnail} alt="test" />
          ) : (
            <img src={noThumbnail} alt="test" />
          )}
        </CardImg>
        <CardBodyLayout>
          <CardTitle>{title}</CardTitle>
          <CardBody dangerouslySetInnerHTML={{ __html: body }} />
          <p>
            <strong>Writer</strong> : {writer}
          </p>
          <p>
            {updateAt !== ''
              ? toStringByFormatting(updateAt)
              : toStringByFormatting(createAt)}
          </p>
          <p>댓글 수 0</p>
        </CardBodyLayout>
      </Link>
    </StyledDiv>
  );
};

const CardTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.5rem;
  padding: 0.5rem 0;
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
`;

export default memo(Card);
