import React, { forwardRef } from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import CommentEditor from './CommentEditor';
import CommentModify from './CommentModify';

const Comment = (
  {
    isOpen,
    currentModifyCommentId,
    comment,
    modifyDisabled,
    modifyCommentValue,
    setIsOpen,
    commentDelete,
    handleCommentModify,
    commentModifyEditorClose,
    handleCommentModifyOnClick,
    handleCommentModifyOnChange,
    handleCommentModifyEditorOnUpdate,
  },
  ref
) => {
  const userInfo = useSelector(({ login }) => login);
  const { _id, body, timeStemp, updateTimeStemp, writer } = comment;

  const formatDate = updateTimeStemp !== '' ? updateTimeStemp : timeStemp;
  const date = moment(Number(formatDate)).format('YYYY-MM-DD HH시 mm분 ss초');

  const truthy = currentModifyCommentId === _id && isOpen;
  const button = (
    <>
      <span
        onClick={
          truthy ? commentModifyEditorClose : handleCommentModifyOnClick(_id)
        }
      >
        {truthy ? '닫기' : '수정'}
      </span>
      <span onClick={commentDelete(_id)}>삭제</span>
    </>
  );

  const modifyMatch = modifyCommentValue.match(/<p>/gi);
  const indent = modifyMatch === null ? 0 : modifyMatch.length;

  return (
    <div>
      <Layout>
        <div>
          <div>
            <span>작성자 {writer}</span>
          </div>
          <div className="dateBox">
            <span>{date}</span>
            {updateTimeStemp !== '' && <span>업데이트됨</span>}
          </div>
        </div>
        {writer === userInfo.id && (
          <div className="modifyAndRemoveBox">{button}</div>
        )}
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Layout>
      <CommentsBox isOpen={isOpen}>
        {truthy && (
          <CommentModify
            ref={ref}
            openDelay={500}
            closeDelay={500}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <span>
              들여쓰기
              <span>( {indent} )</span>
            </span>
            <CommentEditor
              data={modifyCommentValue}
              onChange={handleCommentModifyOnChange}
              onUpdate={handleCommentModifyEditorOnUpdate}
            />
            <div>
              <button
                type="button"
                disabled={modifyDisabled}
                onClick={handleCommentModify(_id)}
              >
                수정하기
              </button>
            </div>
          </CommentModify>
        )}
      </CommentsBox>
    </div>
  );
};

const CommentsBox = styled.div`
  overflow: hidden;
  margin: 1rem 0;
  ${({ isOpen }) =>
    isOpen &&
    css`
      overflow-x: hidden;
      overflow-y: hidden;
    `}
`;

const Layout = styled.div`
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  border: 1px solid rgba(149, 165, 166, 0.2);
  border-radius: 5px;
  font-size: 0.8rem;
  position: relative;
  line-height: 1.5;
  &::after {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    right: 0;
    height: 1px;
    bottom: -14%;
    border-top: 1px solid rgba(149, 165, 166, 0.2);
  }

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 1rem 0;
  }
  & > div:last-child {
    line-height: 1.5;
    min-height: 50px;
  }
  .modifyAndRemoveBox {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 1rem;
    & > span {
      display: inline-block;
      padding: 0.3rem 0.3rem;
      cursor: pointer;
      background-color: ${({ theme }) => theme.color.magacoffeColor1};
      color: ${({ theme }) => theme.color.white1};
      box-shadow: ${({ theme }) => theme.boxShadow1};
      font-weight: bold;
      transition: color 0.25s ease-in-out;
      border-radius: 5px;
      &:hover {
        color: ${({ theme }) => theme.color.black1};
      }
    }
  }
  .dateBox {
    display: flex;
    gap: 0.3rem;
  }

  span + span {
    color: rgba(149, 165, 166, 0.6);
  }

  ${({ theme }) => theme.media.tab} {
    font-size: 0.7rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.6rem;
    .dateBox {
      gap: 0;
      flex-direction: column;
    }
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 0.5rem;
  }
`;

export default forwardRef(Comment);
